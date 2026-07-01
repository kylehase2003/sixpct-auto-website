'use client';

import { useRef, useEffect } from 'react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    'use strict';

    const VS = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

attribute vec2 aPosition;
varying vec2 vUv;

void main() {
    vUv = 0.5 * aPosition + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

    const TRAIL_FS = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 vUv;
uniform float uTime;
uniform float uDeltaTime;
uniform vec2 uMouse;
uniform vec2 uMouseVelocity;
uniform vec2 uResolution;
uniform sampler2D uNoiseTexture;
uniform sampler2D uPreviousFrame;

#define TRAIL_FALLOFF 9000.0
#define FADE_EXP vec4(0.02, 0.02, 0.1, 0.1)
#define SCROLL_SPEED 0.0005
#define DISTORT_SPEED 0.02
#define TURB_NUM 8.0
#define TURB_AMP 0.6
#define TURB_SPEED 0.5
#define TURB_VEL vec2(0.1, 0.0)
#define TURB_FREQ 50.0
#define TURB_EXP 1.3

vec2 turbulence(vec2 p) {
    mat2 rot = mat2(0.6, -0.8, 0.8, 0.6);
    vec2 turb = vec2(0.0);
    float freq = TURB_FREQ;
    for (float i = 0.0; i < TURB_NUM; i++) {
        vec2 pos = p + TURB_SPEED * i * uTime * TURB_VEL;
        float phase = freq * (pos * rot).y + TURB_SPEED * uTime * freq * 0.1;
        turb += rot[0] * sin(phase) / freq;
        rot *= mat2(0.6, -0.8, 0.8, 0.6);
        freq *= TURB_EXP;
    }
    return turb;
}

void main() {
    vec2 ratio = min(uResolution.yx / uResolution.xy, 1.0);
    float delta = 144.0 * uDeltaTime;
    vec2 scroll = SCROLL_SPEED * vec2(1.0, vUv.y - 0.5) * ratio;
    vec2 turb = turbulence((vUv + scroll) / ratio);
    vec2 distort = DISTORT_SPEED * turb;
    vec2 distortedUv = vUv + delta * scroll + delta * distort * ratio;

    vec4 prev = texture2D(uPreviousFrame, distortedUv);

    vec2 trailA = vUv + 0.01 * delta * turb * ratio - uMouse;
    vec2 trailB = -uMouseVelocity;
    float trailD = dot(trailB, trailB);
    vec2 trailDif = trailA / ratio;
    float falloff = 0.0;
    if (trailD > 0.0) {
        float f = clamp(dot(trailA, trailB) / trailD, 0.0, 1.0);
        trailDif -= f * trailB / ratio;
        falloff = 1.0 / (1.0 + TRAIL_FALLOFF * dot(trailDif, trailDif));
        falloff *= min(trailD / (0.001 + trailD), 1.0);
    }

    vec2 suv = (uMouse - uMouseVelocity) * 2.0 - 1.0;
    float vig = 1.0 - abs(suv.y);
    vig *= 0.5 + 0.5 * suv.x;

    vec2 nuv = gl_FragCoord.xy / 64.0 + uTime * vec2(7.1, 9.1);
    float noise = texture2D(uNoiseTexture, nuv).r;

    vec4 fade = pow(vec4(noise), FADE_EXP);
    fade = exp(-2.0 * fade * uDeltaTime);
    vec4 decay = mix(vec4(0.5, 0.5, 0.0, 0.0), prev, fade);

    vec4 col = decay;
    vec2 vel = (-trailB) / (0.01 + length(trailB));
    col.rg -= (0.5 - abs(decay.rg - 0.5)) * (falloff * vel);
    col.ba += falloff * (1.0 - decay.ba) * vec2(1.0, vig * vig);
    col += (noise - 0.5) / 255.0;

    gl_FragColor = col;
}`;

    const MAIN_FS = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uNoiseTexture;
uniform sampler2D uTrailTexture;

#define STAR 5.0
#define FLARE 4.0
#define COLOR vec3(0.9, 0.25, 0.1)
#define STAR_NUM 12.0
#define STAR_AMP 0.5
#define STAR_SPEED 0.01
#define STAR_VEL vec2(1.0, 0.0)
#define STAR_FREQ 8.0
#define STAR_EXP 1.5
#define GLOW_STRENGTH 12.0
#define GLOW_RED  vec3(0.55, 0.12, 0.05)
#define GLOW_BLUE vec3(0.45, 0.22, 0.08)
#define GLOW_TURBULENCE 0.4
#define GLOW_TINT 3.0
#define LIGHT_EXP 30.0
#define TRAIL_EXP vec3(1.4, 1.2, 1.0)
#define TRAIL_STRENGTH 0.4
#define DITHER 0.01
#define DITHER_RES 64.0

vec3 gamma_encode(vec3 lrgb) { return sqrt(lrgb); }

vec2 turbulence(vec2 p, float freq, float num) {
    mat2 rot = mat2(0.6, -0.8, 0.8, 0.6);
    vec2 turb = vec2(0.0);
    for (float i = 0.0; i < STAR_NUM; i++) {
        if (i >= num) break;
        vec2 pos = p + turb + STAR_SPEED * i * uTime * STAR_VEL;
        float phase = freq * (pos * rot).y + STAR_SPEED * uTime * freq;
        turb += rot[0] * sin(phase) / freq;
        rot *= mat2(0.6, -0.8, 0.8, 0.6);
        freq *= STAR_EXP;
    }
    return turb;
}

vec3 star(inout vec2 p) {
    #define STAR_STRETCH 0.7
    #define STAR_CURVE 0.5
    vec2 suv = p * 2.0 - 1.0;
    vec2 right = suv - vec2(1.0, 0.0);
    right.x *= STAR_STRETCH * uResolution.x / uResolution.y;
    float factor = 1.0 + 0.4 * sin(9.0 * suv.y) * sin(5.0 * (suv.x + 5.0 * uTime * STAR_SPEED));
    vec2 turb = right + factor * STAR_AMP * turbulence(right, STAR_FREQ, STAR_NUM);
    turb.x -= STAR_CURVE * suv.y * suv.y;
    float fade = max(4.0 * suv.y * suv.y - suv.x + 1.2, 0.001);
    float atten = fade * max(0.5 * turb.x, -turb.x);
    float ft = 0.4 * uTime;
    vec2 fp = 8.0 * (turb + 0.5 * STAR_VEL * ft);
    fp *= mat2(0.4, -0.3, 0.3, 0.4);
    float f = cos(fp.x) * sin(fp.y) - 0.5;
    float flare = f * f + 0.5 * suv.y * suv.y - 1.5 * turb.x + 0.6 * cos(0.42 * ft + 1.6 * turb.y) * cos(0.31 * ft - turb.y);
    vec3 col = 0.1 * COLOR * (STAR / (atten * atten) + FLARE / (flare * flare));
    const vec3 chrom = vec3(0.0, 0.1, 0.2);
    col *= exp(p.x *
        cos(turb.y * 5.0 + 0.4 * (uTime + turb.x * 1.0) + chrom) *
        cos(turb.y * 7.0 - 0.5 * (uTime - turb.x * 1.5) + chrom) *
        cos(turb.y * 9.0 + 0.6 * (uTime + turb.x * 2.0) + chrom)
    );
    return col;
}

void main() {
    vec2 duv = 0.9 * gl_FragCoord.xy / DITHER_RES * mat2(0.8, -0.6, 0.6, 0.8);
    float dither = texture2D(uNoiseTexture, duv).r - 0.5;
    vec2 ratio = min(uResolution.yx / uResolution.xy, 1.0);
    vec4 trailTex = texture2D(uTrailTexture, vUv);
    vec2 suv = vUv * 2.0 - 1.0;
    vec2 dir = vec2(0.0);
    float glow = 0.0;
    vec2 starUv = vUv;
    starUv += 0.3 * (trailTex.rg - 0.5) * trailTex.b * ratio;
    vec3 col = star(starUv);
    float vig = 1.0 - abs(suv.y);
    vig *= 0.5 + 0.5 * suv.x;
    col *= vig * vig;
    col /= 1.0 + col;
    col = clamp(col, 0.0, 1.0);
    col = gamma_encode(col);
    float yy = suv.y + 0.03;
    yy = max(1.0 - 1e1 * yy * yy / max(0.5 + 1.5 * starUv.x, 0.1), 0.0);
    float light = max(0.5 + 0.5 * starUv.x, 0.0) * yy;
    light += 2.0 * (1.0 - light) * glow;
    float tint = GLOW_TINT * dir.x * glow;
    vec3 hue = mix(GLOW_RED, GLOW_BLUE, 1.0 + suv.x + tint);
    float alpha = 1.0 - (1.0 - pow(yy, LIGHT_EXP)) * glow;
    vec3 rim = GLOW_STRENGTH * light * light * light * light * alpha * (0.5 + 0.5 * suv.x) * hue;
    rim /= (1.0 + rim);
    col += (1.0 - col) * rim * rim;
    col += TRAIL_STRENGTH * hue * pow(trailTex.aaa, TRAIL_EXP);
    col += DITHER * dither;
    gl_FragColor = vec4(col, 1.0);
}`;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = (canvas.getContext('webgl2') || canvas.getContext('webgl')) as WebGLRenderingContext | null;
    if (!gl) { canvas.style.display = 'none'; return; }

    const MAX_TEX = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    let pixelScale = 1.0;
    let frameCount = 0, fpsStart = 0, fps = 60;
    let lastTime = 0, deltaTime = 0.0167, lastPerfCheck = 0;

    const glBuffers: WebGLBuffer[] = [], glTextures: WebGLTexture[] = [], glFBOs: WebGLFramebuffer[] = [], glPrograms: WebGLProgram[] = [];

    function compileShader(type: number, src: string) {
      const s = gl!.createShader(type);
      if (!s) return null;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) { console.error('Shader error:', gl!.getShaderInfoLog(s)); return null; }
      return s;
    }

    function createProgram(vsSrc: string, fsSrc: string) {
      const vs = compileShader(gl!.VERTEX_SHADER, vsSrc);
      const fs = compileShader(gl!.FRAGMENT_SHADER, fsSrc);
      if (!vs || !fs) return null;
      const prog = gl!.createProgram();
      if (!prog) return null;
      gl!.attachShader(prog, vs); gl!.attachShader(prog, fs);
      gl!.linkProgram(prog);
      if (!gl!.getProgramParameter(prog, gl!.LINK_STATUS)) { console.error('Link error:', gl!.getProgramInfoLog(prog)); return null; }
      glPrograms.push(prog);
      return prog;
    }

    function makeFramebufferTex() {
      const tex = gl!.createTexture()!;
      glTextures.push(tex);
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, Math.floor(canvas!.width * pixelScale), Math.floor(canvas!.height * pixelScale), 0, gl!.RGBA, gl!.UNSIGNED_BYTE, null);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      return tex;
    }

    function makeFBO(tex: WebGLTexture) {
      const fbo = gl!.createFramebuffer()!;
      glFBOs.push(fbo);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, tex, 0);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      return fbo;
    }

    function useProgram(prog: WebGLProgram) {
      gl!.useProgram(prog);
      const loc = gl!.getAttribLocation(prog, 'aPosition');
      gl!.bindBuffer(gl!.ARRAY_BUFFER, quadBuf);
      gl!.enableVertexAttribArray(loc);
      gl!.vertexAttribPointer(loc, 2, gl!.FLOAT, false, 0, 0);
    }

    const mainProg = createProgram(VS, MAIN_FS);
    const trailProg = createProgram(VS, TRAIL_FS);

    const quadBuf = gl.createBuffer()!;
    glBuffers.push(quadBuf);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const MU = mainProg ? {
      time: gl.getUniformLocation(mainProg, 'uTime'),
      resolution: gl.getUniformLocation(mainProg, 'uResolution'),
      noiseTexture: gl.getUniformLocation(mainProg, 'uNoiseTexture'),
      trailTexture: gl.getUniformLocation(mainProg, 'uTrailTexture'),
    } : {};

    const TU = trailProg ? {
      time: gl.getUniformLocation(trailProg, 'uTime'),
      deltaTime: gl.getUniformLocation(trailProg, 'uDeltaTime'),
      mouse: gl.getUniformLocation(trailProg, 'uMouse'),
      mouseVelocity: gl.getUniformLocation(trailProg, 'uMouseVelocity'),
      resolution: gl.getUniformLocation(trailProg, 'uResolution'),
      noiseTexture: gl.getUniformLocation(trailProg, 'uNoiseTexture'),
      previousFrame: gl.getUniformLocation(trailProg, 'uPreviousFrame'),
    } : {};

    const fbTextures = [makeFramebufferTex(), makeFramebufferTex()];
    const fbos = [makeFBO(fbTextures[0]), makeFBO(fbTextures[1])];
    let currentFBO = 0;

    let O = [0.5, 0.5];
    let k = [0.5, 0.5];

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      O[0] = (e.clientX - rect.left) / rect.width;
      O[1] = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas!.getBoundingClientRect();
        O[0] = (e.touches[0].clientX - rect.left) / rect.width;
        O[1] = 1.0 - (e.touches[0].clientY - rect.top) / rect.height;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    function setResolution() {
      if (mainProg) { gl!.useProgram(mainProg); gl!.uniform2f((MU as any).resolution, canvas!.width, canvas!.height); }
      if (trailProg) { gl!.useProgram(trailProg); gl!.uniform2f((TU as any).resolution, canvas!.width, canvas!.height); }
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas!.width = canvas!.clientWidth * dpr;
      canvas!.height = canvas!.clientHeight * dpr;
      for (const tex of fbTextures) {
        gl!.bindTexture(gl!.TEXTURE_2D, tex);
        gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, Math.floor(canvas!.width * pixelScale), Math.floor(canvas!.height * pixelScale), 0, gl!.RGBA, gl!.UNSIGNED_BYTE, null);
      }
      setResolution();
    }

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    function loadTexture(src: string, repeat: boolean): Promise<WebGLTexture> {
      return new Promise((resolve, reject) => {
        const tex = gl!.createTexture()!;
        glTextures.push(tex);
        gl!.bindTexture(gl!.TEXTURE_2D, tex);
        gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, 1, 1, 0, gl!.RGBA, gl!.UNSIGNED_BYTE, new Uint8Array([128, 128, 128, 255]));
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          let w = img.width, h = img.height;
          if (w > MAX_TEX || h > MAX_TEX) {
            const s = Math.min(MAX_TEX / w, MAX_TEX / h);
            w = Math.floor(w * s); h = Math.floor(h * s);
            const tmp = document.createElement('canvas');
            tmp.width = w; tmp.height = h;
            tmp.getContext('2d')!.drawImage(img, 0, 0, w, h);
            gl!.bindTexture(gl!.TEXTURE_2D, tex);
            gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, tmp);
          } else {
            gl!.bindTexture(gl!.TEXTURE_2D, tex);
            gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, img);
          }
          gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
          gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
          gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, repeat ? gl!.REPEAT : gl!.CLAMP_TO_EDGE);
          gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, repeat ? gl!.REPEAT : gl!.CLAMP_TO_EDGE);
          resolve(tex);
        };
        img.onerror = () => reject(src);
        img.src = src;
      });
    }

    function makeProceduralNoise() {
      const size = 256;
      const data = new Uint8Array(size * size * 4);
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const idx = (y * size + x) * 4;
          let v = 0, amp = 0.5, freq = 1;
          for (let o = 0; o < 4; o++) {
            const px = (x / size) * freq, py = (y / size) * freq;
            const ix = Math.floor(px), iy = Math.floor(py);
            const fx = px - ix, fy = py - iy;
            const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
            const h = (a: number, b: number) => { let n = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return n - Math.floor(n); };
            v += amp * (h(ix, iy) * (1 - ux) * (1 - uy) + h(ix + 1, iy) * ux * (1 - uy) + h(ix, iy + 1) * (1 - ux) * uy + h(ix + 1, iy + 1) * ux * uy);
            amp *= 0.5; freq *= 2;
          }
          const byte = Math.min(255, Math.max(0, v * 255)) | 0;
          data[idx] = data[idx + 1] = data[idx + 2] = byte; data[idx + 3] = 255;
        }
      }
      const tex = gl!.createTexture()!;
      glTextures.push(tex);
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, size, size, 0, gl!.RGBA, gl!.UNSIGNED_BYTE, data);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.REPEAT);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.REPEAT);
      return tex;
    }

    let rafId: number;

    function startRender(noiseTex: WebGLTexture) {
      resize();
      function render(ts: number) {
        if (document.hidden) { rafId = requestAnimationFrame(render); return; }
        const t = ts * 0.001;
        deltaTime = lastTime > 0 ? Math.min((ts - lastTime) * 0.001, 0.05) : 0.0167;
        lastTime = ts;
        frameCount++;
        if (t - fpsStart >= 1.0) { fps = Math.round(frameCount / (t - fpsStart)); frameCount = 0; fpsStart = t; }
        if (t - lastPerfCheck > 2.0) {
          if (fps < 30 && pixelScale > 0.5) { pixelScale = Math.max(0.5, pixelScale - .1); resize(); }
          else if (fps > 55 && pixelScale < 1.0) { pixelScale = Math.min(1.0, pixelScale + .1); resize(); }
          lastPerfCheck = t;
        }
        const r = [O[0] - k[0], O[1] - k[1]];
        k[0] += r[0]; k[1] += r[1];
        const next = (currentFBO + 1) % 2;
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbos[next]);
        useProgram(trailProg!);
        gl!.uniform1f((TU as any).time, t);
        gl!.uniform1f((TU as any).deltaTime, deltaTime);
        gl!.uniform2f((TU as any).mouse, O[0], O[1]);
        gl!.uniform2f((TU as any).mouseVelocity, r[0], r[1]);
        gl!.activeTexture(gl!.TEXTURE0); gl!.bindTexture(gl!.TEXTURE_2D, noiseTex); gl!.uniform1i((TU as any).noiseTexture, 0);
        gl!.activeTexture(gl!.TEXTURE1); gl!.bindTexture(gl!.TEXTURE_2D, fbTextures[currentFBO]); gl!.uniform1i((TU as any).previousFrame, 1);
        gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
        useProgram(mainProg!);
        gl!.uniform1f((MU as any).time, t);
        gl!.activeTexture(gl!.TEXTURE0); gl!.bindTexture(gl!.TEXTURE_2D, noiseTex); gl!.uniform1i((MU as any).noiseTexture, 0);
        gl!.activeTexture(gl!.TEXTURE2); gl!.bindTexture(gl!.TEXTURE_2D, fbTextures[next]); gl!.uniform1i((MU as any).trailTexture, 2);
        gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
        currentFBO = next;
        rafId = requestAnimationFrame(render);
      }
      rafId = requestAnimationFrame(render);
    }

    loadTexture('https://x.ai/images/noise.png', true)
      .then(startRender)
      .catch(() => startRender(makeProceduralNoise()));

    const onVisibilityChange = () => {
      if (!document.hidden) { lastTime = 0; fpsStart = performance.now() * 0.001; frameCount = 0; }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      glBuffers.forEach(b => gl.deleteBuffer(b));
      glTextures.forEach(t => gl.deleteTexture(t));
      glFBOs.forEach(f => gl.deleteFramebuffer(f));
      glPrograms.forEach(p => gl.deleteProgram(p));
    };
  }, []);

  return (
    <section className="hero">
      <canvas
        ref={canvasRef}
        id="heroCanvas"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
      ></canvas>

      <div className="hero-inner">
        <p className="hero-tag">Execution Layer</p>
        <h1>Stop managing work.<br />Start executing it.</h1>
        <p className="hero-sub">Six% Auto is an AI-powered execution layer that removes the operational friction slowing
          your business down — without predictions, dashboards, or guesswork.</p>
        <div className="hero-actions">
          <a href="#contact" className="btn-fill">Book a Call</a>
          <a href="#services" className="btn-ghost">See How It Works</a>
        </div>
      </div>

      <div className="marquee">
        <div className="marquee-track">
          <span>WORKFLOW AUTOMATION</span><span>·</span><span>SCHEDULING &amp;
            COORDINATION</span><span>·</span>
          <span>KNOWLEDGE ACCESS</span><span>·</span><span>DOCUMENT PROCESSING</span><span>·</span>
          <span>CUSTOMER INTERACTION</span><span>·</span><span>DRAFTING SUPPORT</span><span>·</span>
          <span>EMPLOYEE PRODUCTIVITY</span><span>·</span><span>ADMINISTRATIVE REMOVAL</span><span>·</span>
          {/* duplicate for seamless loop */}
          <span>WORKFLOW AUTOMATION</span><span>·</span><span>SCHEDULING &amp;
            COORDINATION</span><span>·</span>
          <span>KNOWLEDGE ACCESS</span><span>·</span><span>DOCUMENT PROCESSING</span><span>·</span>
          <span>CUSTOMER INTERACTION</span><span>·</span><span>DRAFTING SUPPORT</span><span>·</span>
          <span>EMPLOYEE PRODUCTIVITY</span><span>·</span><span>ADMINISTRATIVE REMOVAL</span><span>·</span>
        </div>
      </div>
    </section>
  );
}
