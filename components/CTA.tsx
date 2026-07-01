'use client';

import { useRef, useEffect } from 'react';

export default function CTA() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function draw() {
      if (!canvas) return;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      // The eclipse is a giant circle whose center is off-screen
      // Top arc: center far below the viewport
      // Bottom arc: center far above the viewport
      const R = W * 0.92;

      function drawArc(cx: number, cy: number, startAngle: number, endAngle: number) {
        if (!ctx) return;
        // Outermost diffuse halo
        ctx.beginPath();
        ctx.arc(cx, cy, R, startAngle, endAngle);
        ctx.strokeStyle = 'rgba(235,67,38,0.06)';
        ctx.lineWidth = 160;
        ctx.filter = 'blur(40px)';
        ctx.stroke();

        // Mid glow
        ctx.beginPath();
        ctx.arc(cx, cy, R, startAngle, endAngle);
        ctx.strokeStyle = 'rgba(235,67,38,0.18)';
        ctx.lineWidth = 60;
        ctx.filter = 'blur(18px)';
        ctx.stroke();

        // Inner warm glow
        ctx.beginPath();
        ctx.arc(cx, cy, R, startAngle, endAngle);
        ctx.strokeStyle = 'rgba(255,140,60,0.45)';
        ctx.lineWidth = 18;
        ctx.filter = 'blur(6px)';
        ctx.stroke();

        // Core bright line
        ctx.beginPath();
        ctx.arc(cx, cy, R, startAngle, endAngle);
        ctx.strokeStyle = 'rgba(255,180,90,0.95)';
        ctx.lineWidth = 2;
        ctx.filter = 'blur(0.5px)';
        ctx.stroke();

        ctx.filter = 'none';
      }

      // TOP ARC — circle center pushed further below the screen
      const topCY = H + R * 0.75;
      drawArc(W / 2, topCY, Math.PI * 1.22, Math.PI * 1.78);

      // BOTTOM ARC — circle center pushed further above the screen
      const botCY = -R * 0.75;
      drawArc(W / 2, botCY, Math.PI * 0.22, Math.PI * 0.78);
    }

    draw();
    window.addEventListener('resize', draw);
    return () => {
      window.removeEventListener('resize', draw);
    };
  }, []);

  return (
    <section className="cta-section">

      {/* ECLIPSE RINGS via canvas */}
      <canvas id="eclipse-canvas" ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}></canvas>

      {/* FLOATING IMAGES */}
      <div className="img-float img-tl">
        <img src="images/robotic_arm.png" alt="Industrial Automation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="img-float img-bl">
        <img src="images/server_cabling.png" alt="System Infrastructure" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="img-float img-tr">
        <img src="images/optical_sensor.png" alt="Optical Precision" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="img-float img-br">
        <img src="images/circuitry.png" alt="Motherboard Processing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* CENTER CONTENT */}
      <div className="cta-content">
        <h2 className="cta-headline">
          Stop managing friction.
          <span>Start executing with the System.</span>
        </h2>
        <p className="cta-subtext">
          Every hour lost to manual work is profit leaking from your business. It&apos;s time to build your execution layer.
        </p>
        <a href="#contact" className="cta-btn">
          <span className="cta-btn-text">Let&apos;s talk</span>
          <span className="cta-btn-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#eb4326" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </a>
      </div>

    </section>
  );
}
