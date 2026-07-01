'use client';

import { useState, useEffect, useRef } from 'react';

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  function handleCardClick(index: number) {
    if (window.innerWidth <= 768) {
      setFlippedCards(prev => {
        const next = new Set(prev);
        next.has(index) ? next.delete(index) : next.add(index);
        return next;
      });
    } else {
      openModal();
    }
  }

  const cv1Ref = useRef<HTMLCanvasElement>(null);
  const cv2Ref = useRef<HTMLCanvasElement>(null);
  const cv3Ref = useRef<HTMLCanvasElement>(null);
  const cv4Ref = useRef<HTMLCanvasElement>(null);
  const cv5Ref = useRef<HTMLCanvasElement>(null);

  function openModal() {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    setModalOpen(false);
    document.body.style.overflow = '';
  }

  useEffect(() => {
    // ── SV2-CV1: Booking Chaos — glowing calendar grid ──
    const initCv1 = (function() {
      const cv = cv1Ref.current;
      if (!cv) return;
      const p = cv.parentElement!;
      let cells: { x: number; y: number; w: number; h: number; phase: number; speed: number; type: string }[] = [];
      let W: number, H: number;
      (cv as any)._active = true;

      function init() {
        W = cv!.width = p.offsetWidth; H = cv!.height = p.offsetHeight;
        cells = [];
        const cols = 7, rows = 6, cw = W/cols, ch = H/rows;
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
          cells.push({ x: c*cw+1, y: r*ch+1, w: cw-2, h: ch-2,
            phase: Math.random()*Math.PI*2, speed: 0.01+Math.random()*0.015,
            type: Math.random()<0.14?'red':Math.random()<0.25?'dim':'base' });
        }
      }

      function draw() {
        const ctx = cv!.getContext('2d')!; ctx.clearRect(0,0,W,H);
        cells.forEach(function(c) {
          c.phase += c.speed;
          const pulse = (Math.sin(c.phase)+1)/2;
          if (c.type==='red') {
            ctx.shadowBlur=22; ctx.shadowColor='#ff2200';
            ctx.fillStyle='rgba(255,34,0,'+(0.18+pulse*0.55)+')';
            ctx.fillRect(c.x,c.y,c.w,c.h);
            ctx.strokeStyle='rgba(255,80,0,'+(0.6+pulse*0.4)+')';
            ctx.lineWidth=0.8; ctx.strokeRect(c.x,c.y,c.w,c.h);
          } else if (c.type==='dim') {
            ctx.shadowBlur=0;
            ctx.fillStyle='rgba(255,255,255,'+(0.012+pulse*0.02)+')';
            ctx.fillRect(c.x,c.y,c.w,c.h);
            ctx.strokeStyle='rgba(255,255,255,0.05)'; ctx.lineWidth=0.5; ctx.strokeRect(c.x,c.y,c.w,c.h);
          } else {
            ctx.shadowBlur=0;
            ctx.strokeStyle='rgba(255,255,255,0.03)'; ctx.lineWidth=0.5; ctx.strokeRect(c.x,c.y,c.w,c.h);
          }
          ctx.shadowBlur=0;
        });
        if ((cv as any)._active !== false) requestAnimationFrame(draw);
      }

      new IntersectionObserver(function(e){ (cv as any)._active=e[0].isIntersecting; if((cv as any)._active) draw(); },{rootMargin:'100px'}).observe(cv!);
      init(); window.addEventListener('resize', init);
      return init;
    })();

    // ── SV2-CV2: Operator Overload — node network, red overloaded nodes ──
    const initCv2 = (function() {
      const cv = cv2Ref.current;
      if (!cv) return;
      const p = cv.parentElement!;
      let nodes: { x: number; y: number; vx: number; vy: number; r: number; phase: number; overloaded: boolean }[] = [];
      let W: number, H: number;
      (cv as any)._active = true;

      function init() {
        W = cv!.width = p.offsetWidth; H = cv!.height = p.offsetHeight;
        nodes = [];
        for (let i = 0; i < 9; i++) nodes.push({
          x: 0.1*W+Math.random()*0.8*W, y: 0.1*H+Math.random()*0.8*H,
          vx: (Math.random()-0.5)*0.35, vy: (Math.random()-0.5)*0.35,
          r: 3+Math.random()*2.5, phase: Math.random()*Math.PI*2,
          overloaded: Math.random()<0.3
        });
      }

      function draw() {
        const ctx = cv!.getContext('2d')!; ctx.clearRect(0,0,W,H);
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i+1; j < nodes.length; j++) {
            const a=nodes[i], b=nodes[j];
            const dist=Math.hypot(a.x-b.x,a.y-b.y);
            if (dist < W*0.48) {
              const alpha=(1-dist/(W*0.48));
              if (a.overloaded||b.overloaded) {
                ctx.strokeStyle='rgba(255,34,0,'+(alpha*0.7)+')';
                ctx.shadowBlur=10; ctx.shadowColor='#ff2200';
              } else {
                ctx.strokeStyle='rgba(0,255,100,'+(alpha*0.35)+')';
                ctx.shadowBlur=6; ctx.shadowColor='#00ff64';
              }
              ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
              ctx.shadowBlur=0;
            }
          }
        }
        nodes.forEach(function(n) {
          n.phase+=0.022; n.x+=n.vx; n.y+=n.vy;
          if(n.x<15||n.x>W-15) n.vx*=-1;
          if(n.y<15||n.y>H-15) n.vy*=-1;
          const pulse=(Math.sin(n.phase)+1)/2;
          if(n.overloaded) {
            ctx.shadowBlur=24; ctx.shadowColor='#ff2200';
            ctx.fillStyle='rgba(255,34,0,'+(0.7+pulse*0.3)+')';
          } else {
            ctx.shadowBlur=16; ctx.shadowColor='#00ff64';
            ctx.fillStyle='rgba(0,255,100,'+(0.5+pulse*0.5)+')';
          }
          ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill();
          ctx.shadowBlur=0;
        });
        if ((cv as any)._active !== false) requestAnimationFrame(draw);
      }

      new IntersectionObserver(function(e){ (cv as any)._active=e[0].isIntersecting; if((cv as any)._active) draw(); },{rootMargin:'100px'}).observe(cv!);
      init(); window.addEventListener('resize', init);
      return init;
    })();

    // ── SV2-CV3: Flying Blind — scatter dots, big glowing 0 ──
    const initCv3 = (function() {
      const cv = cv3Ref.current;
      if (!cv) return;
      const p = cv.parentElement!;
      let W: number, H: number, t=0;
      const dots=[{x:.15,y:.3},{x:.25,y:.55},{x:.4,y:.2},{x:.5,y:.65},{x:.6,y:.4},
                  {x:.7,y:.25},{x:.8,y:.5},{x:.35,y:.75},{x:.55,y:.8},{x:.9,y:.35}];
      (cv as any)._active = true;

      function init() { W=cv!.width=p.offsetWidth; H=cv!.height=p.offsetHeight; }

      function draw() {
        const ctx=cv!.getContext('2d')!; ctx.clearRect(0,0,W,H); t+=0.015;
        ctx.font='800 '+(W*0.38)+'px Inter,sans-serif';
        ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.shadowBlur=50; ctx.shadowColor='#ff2200';
        ctx.fillStyle='rgba(255,34,0,'+(0.08+Math.sin(t)*0.03)+')';
        ctx.fillText('0',W*0.5,H*0.44);
        ctx.shadowBlur=0;
        dots.forEach(function(d,i) {
          const pulse=(Math.sin(t+i*0.7)+1)/2;
          if(i%3===0) {
            ctx.shadowBlur=16; ctx.shadowColor='#ff2200';
            ctx.fillStyle='rgba(255,34,0,'+(0.55+pulse*0.45)+')';
            ctx.beginPath(); ctx.arc(d.x*W,d.y*H,3.5,0,Math.PI*2); ctx.fill();
          } else {
            ctx.shadowBlur=0;
            ctx.fillStyle='rgba(255,255,255,'+(0.04+pulse*0.06)+')';
            ctx.beginPath(); ctx.arc(d.x*W,d.y*H,2,0,Math.PI*2); ctx.fill();
          }
          ctx.shadowBlur=0;
        });
        if ((cv as any)._active !== false) requestAnimationFrame(draw);
      }

      new IntersectionObserver(function(e){ (cv as any)._active=e[0].isIntersecting; if((cv as any)._active) draw(); },{rootMargin:'100px'}).observe(cv!);
      init(); window.addEventListener('resize', init);
      return init;
    })();

    // ── SV2-CV4: Losing Customers — green wave fading, red dots falling ──
    const initCv4 = (function() {
      const cv = cv4Ref.current;
      if (!cv) return;
      const p = cv.parentElement!;
      let W: number, H: number, t=0;
      (cv as any)._active = true;

      function init() { W=cv!.width=p.offsetWidth; H=cv!.height=p.offsetHeight; }

      function draw() {
        const ctx=cv!.getContext('2d')!; ctx.clearRect(0,0,W,H); t+=0.022;
        const mid=H*0.42, amp=H*0.1;
        ctx.beginPath();
        for(let x=0;x<=W;x+=2) {
          const prog=x/W, fade=Math.max(0,1-prog*1.6);
          const y=mid-Math.sin(x*0.03-t)*amp*fade;
          x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
        }
        ctx.strokeStyle='rgba(0,255,100,0.85)'; ctx.lineWidth=2.2;
        ctx.shadowBlur=22; ctx.shadowColor='#00ff64'; ctx.stroke(); ctx.shadowBlur=0;
        ctx.beginPath();
        for(let x=0;x<=W;x+=2) {
          const prog=x/W, fade=Math.max(0,1-prog*1.3);
          const y=mid+22-Math.sin(x*0.028-t+0.9)*amp*0.55*fade;
          x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
        }
        ctx.strokeStyle='rgba(0,255,100,0.25)'; ctx.lineWidth=1.2; ctx.stroke();
        [0.52,0.64,0.75,0.86].forEach(function(xf,i) {
          const phase=(t*0.75+i*1.3)%(Math.PI*2);
          const fall=phase/(Math.PI*2);
          const dy=mid+fall*H*0.45;
          const a=1-fall;
          ctx.shadowBlur=18; ctx.shadowColor='#ff2200';
          ctx.fillStyle='rgba(255,34,0,'+(a*0.95)+')';
          ctx.beginPath(); ctx.arc(xf*W,dy,3,0,Math.PI*2); ctx.fill();
          ctx.shadowBlur=0;
        });
        if ((cv as any)._active !== false) requestAnimationFrame(draw);
      }

      new IntersectionObserver(function(e){ (cv as any)._active=e[0].isIntersecting; if((cv as any)._active) draw(); },{rootMargin:'100px'}).observe(cv!);
      init(); window.addEventListener('resize', init);
      return init;
    })();

    // ── SV2-CV5: Scattered Records — nodes with pulsing red connections ──
    const initCv5 = (function() {
      const cv = cv5Ref.current;
      if (!cv) return;
      const p = cv.parentElement!;
      let W: number, H: number, t=0;
      const boxes=[{l:'EHR',x:.12,y:.35},{l:'CRM',x:.38,y:.22},{l:'INV',x:.65,y:.3},
                   {l:'RAG',x:.28,y:.65},{l:'DATA',x:.58,y:.7},{l:'MAIL',x:.82,y:.55}];
      const edges=[[0,1],[1,2],[0,3],[2,4],[1,3],[3,4],[2,5],[4,5],[0,2]];
      (cv as any)._active = true;

      function init() { W=cv!.width=p.offsetWidth; H=cv!.height=p.offsetHeight; }

      function draw() {
        const ctx=cv!.getContext('2d')!; ctx.clearRect(0,0,W,H); t+=0.016;
        edges.forEach(function(e,i) {
          const a=boxes[e[0]], b=boxes[e[1]];
          const ax=a.x*W, ay=a.y*H, bx=b.x*W, by=b.y*H;
          ctx.strokeStyle='rgba(255,255,255,0.05)'; ctx.lineWidth=1;
          ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.stroke();
          const prog=((t*0.55+i*0.9)%(Math.PI*2))/(Math.PI*2);
          const px=ax+(bx-ax)*prog, py=ay+(by-ay)*prog;
          ctx.shadowBlur=18; ctx.shadowColor='#ff2200';
          ctx.fillStyle='rgba(255,34,0,1)';
          ctx.beginPath(); ctx.arc(px,py,2.5,0,Math.PI*2); ctx.fill();
          ctx.shadowBlur=0;
        });
        boxes.forEach(function(b,i) {
          const x=b.x*W, y=b.y*H, w=36, h=20;
          const pulse=(Math.sin(t+i*0.6)+1)/2;
          ctx.fillStyle='rgba(0,0,0,0.9)'; ctx.fillRect(x-w/2,y-h/2,w,h);
          ctx.shadowBlur=12; ctx.shadowColor='#ff2200';
          ctx.strokeStyle='rgba(255,34,0,'+(0.35+pulse*0.5)+')';
          ctx.lineWidth=0.9; ctx.strokeRect(x-w/2,y-h/2,w,h); ctx.shadowBlur=0;
          ctx.font='700 8px Inter,sans-serif';
          ctx.textAlign='center'; ctx.textBaseline='middle';
          ctx.fillStyle='rgba(255,255,255,'+(0.45+pulse*0.35)+')';
          ctx.fillText(b.l,x,y);
        });
        if ((cv as any)._active !== false) requestAnimationFrame(draw);
      }

      new IntersectionObserver(function(e){ (cv as any)._active=e[0].isIntersecting; if((cv as any)._active) draw(); },{rootMargin:'100px'}).observe(cv!);
      init(); window.addEventListener('resize', init);
      return init;
    })();

  return () => {
    [cv1Ref, cv2Ref, cv3Ref, cv4Ref, cv5Ref].forEach(ref => {
      if (ref.current) (ref.current as any)._active = false;
    });
    if (initCv1) window.removeEventListener('resize', initCv1);
    if (initCv2) window.removeEventListener('resize', initCv2);
    if (initCv3) window.removeEventListener('resize', initCv3);
    if (initCv4) window.removeEventListener('resize', initCv4);
    if (initCv5) window.removeEventListener('resize', initCv5);
  };
  }, []);

  return (
    <>
      {/* SERVICES v2 — NEW VERSION */}
      <section id="services-v2" style={{ background: '#000', color: '#fff', fontFamily: "'Inter','Helvetica Neue',sans-serif", padding: '80px 40px' }}>
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#eb4326', margin: '0 0 14px' }}>What we solve</p>
            <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: '#fff', margin: '0 0 10px', letterSpacing: '-0.035em', lineHeight: 1.1 }}>Your business, on autopilot.</h2>
            <p style={{ fontSize: '13px', color: '#555', maxWidth: '360px', margin: '0 auto', lineHeight: 1.7 }}>Five problems quietly draining your time and revenue, each one automated away.</p>
          </div>

          <div className="sv2-grid">

            {/* 01 */}
            <div className={`sv2-card${flippedCards.has(0) ? ' sv2-flipped' : ''}`} onClick={() => handleCardClick(0)} onKeyDown={(e) => e.key === 'Enter' && handleCardClick(0)} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>
              <div className="sv2-flipper">
                <div className="sv2-front">
                  <canvas ref={cv1Ref} id="sv2-cv1" style={{ position: 'absolute', top: 0, left: 0 }}></canvas>
                  <div className="sv2-fade"></div>
                  <span className="sv2-num">01</span>
                  <div className="sv2-front-body">
                    <p className="sv2-cat">Appointments</p>
                    <h3 className="sv2-title">Booking<br />Chaos</h3>
                    <p className="sv2-desc">No-shows, double bookings and missed confirmations bleeding revenue every single day.</p>
                  </div>
                </div>
                <div className="sv2-back">
                  <p className="sv2-back-label">&#x2713; Fixed with Six% Auto</p>
                  <h3 className="sv2-back-title">Smart Booking,<br />Zero Leakage</h3>
                  <p className="sv2-back-desc">Every appointment confirmed, reminded, and followed up automatically, before it becomes a no-show.</p>
                  <div className="sv2-items">
                    <div className="sv2-item">Automated SMS &amp; email confirmations</div>
                    <div className="sv2-item">No-show alerts sent in real time</div>
                    <div className="sv2-item">Rescheduling handled without staff</div>
                    <div className="sv2-item">Calendar always clean and accurate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 02 */}
            <div className={`sv2-card${flippedCards.has(1) ? ' sv2-flipped' : ''}`} onClick={() => handleCardClick(1)} onKeyDown={(e) => e.key === 'Enter' && handleCardClick(1)} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>
              <div className="sv2-flipper">
                <div className="sv2-front">
                  <canvas ref={cv2Ref} id="sv2-cv2" style={{ position: 'absolute', top: 0, left: 0 }}></canvas>
                  <div className="sv2-fade"></div>
                  <span className="sv2-num">02</span>
                  <div className="sv2-front-body">
                    <p className="sv2-cat">Operations</p>
                    <h3 className="sv2-title">Operator<br />Overload</h3>
                    <p className="sv2-desc">One person doing the job of five: calls, messages, scheduling and admin at once.</p>
                  </div>
                </div>
                <div className="sv2-back">
                  <p className="sv2-back-label">&#x2713; Fixed with Six% Auto</p>
                  <h3 className="sv2-back-title">Your AI-Powered<br />Front Desk</h3>
                  <p className="sv2-back-desc">A 24/7 AI layer that handles the volume so your team focuses on work that actually matters.</p>
                  <div className="sv2-items">
                    <div className="sv2-item">24/7 AI voice agent answers calls</div>
                    <div className="sv2-item">Messages routed and replied automatically</div>
                    <div className="sv2-item">Tasks assigned without manual input</div>
                    <div className="sv2-item">Staff freed from repetitive admin</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 03 */}
            <div className={`sv2-card${flippedCards.has(2) ? ' sv2-flipped' : ''}`} onClick={() => handleCardClick(2)} onKeyDown={(e) => e.key === 'Enter' && handleCardClick(2)} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>
              <div className="sv2-flipper">
                <div className="sv2-front">
                  <canvas ref={cv3Ref} id="sv2-cv3" style={{ position: 'absolute', top: 0, left: 0 }}></canvas>
                  <div className="sv2-fade"></div>
                  <span className="sv2-num">03</span>
                  <div className="sv2-front-body">
                    <p className="sv2-cat">Intelligence</p>
                    <h3 className="sv2-title">Flying<br />Blind</h3>
                    <p className="sv2-desc">No CRM, no tracking, no idea what&apos;s working. We wire in the intelligence layer.</p>
                  </div>
                </div>
                <div className="sv2-back">
                  <p className="sv2-back-label">&#x2713; Fixed with Six% Auto</p>
                  <h3 className="sv2-back-title">Full Visibility,<br />Real Time</h3>
                  <p className="sv2-back-desc">Know exactly where every lead, client and dollar stands, always, without lifting a finger.</p>
                  <div className="sv2-items">
                    <div className="sv2-item">CRM built and populated automatically</div>
                    <div className="sv2-item">Lead tracking from first touch to close</div>
                    <div className="sv2-item">RAG knowledge base for instant answers</div>
                    <div className="sv2-item">Live reporting on what&apos;s working</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 04 */}
            <div className={`sv2-card${flippedCards.has(3) ? ' sv2-flipped' : ''}`} onClick={() => handleCardClick(3)} onKeyDown={(e) => e.key === 'Enter' && handleCardClick(3)} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>
              <div className="sv2-flipper">
                <div className="sv2-front">
                  <canvas ref={cv4Ref} id="sv2-cv4" style={{ position: 'absolute', top: 0, left: 0 }}></canvas>
                  <div className="sv2-fade"></div>
                  <span className="sv2-num">04</span>
                  <div className="sv2-front-body">
                    <p className="sv2-cat">Retention</p>
                    <h3 className="sv2-title">Losing Customers<br />Without Knowing It</h3>
                    <p className="sv2-desc">Clients leaving quietly after one visit. No follow-up, no return, no second chance.</p>
                  </div>
                </div>
                <div className="sv2-back">
                  <p className="sv2-back-label">&#x2713; Fixed with Six% Auto</p>
                  <h3 className="sv2-back-title">Every Client<br />Comes Back</h3>
                  <p className="sv2-back-desc">Automated follow-ups that feel personal, sent at the right time, every time.</p>
                  <div className="sv2-items">
                    <div className="sv2-item">Post-visit follow-up sent automatically</div>
                    <div className="sv2-item">Review requests timed perfectly</div>
                    <div className="sv2-item">Re-engagement for inactive clients</div>
                    <div className="sv2-item">Retention tracked and measured</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 05 full width */}
            <div className={`sv2-card sv2-full${flippedCards.has(4) ? ' sv2-flipped' : ''}`} onClick={() => handleCardClick(4)} onKeyDown={(e) => e.key === 'Enter' && handleCardClick(4)} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>
              <div className="sv2-flipper">
                <div className="sv2-front">
                  <canvas ref={cv5Ref} id="sv2-cv5" style={{ position: 'absolute', top: 0, left: 0 }}></canvas>
                  <div className="sv2-fade"></div>
                  <span className="sv2-num">05</span>
                  <div className="sv2-front-body">
                    <p className="sv2-cat">Data</p>
                    <h3 className="sv2-title">Scattered Records</h3>
                    <p className="sv2-desc">Files, inventory and patient data spread across too many disconnected places.</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '14px' }}>
                      <span style={{ fontSize: '9.5px', fontWeight: 500, borderRadius: '100px', padding: '4px 10px', color: 'rgba(235,67,38,0.8)', background: 'rgba(235,67,38,0.07)', border: '1px solid rgba(235,67,38,0.15)' }}>EHR</span>
                      <span style={{ fontSize: '9.5px', fontWeight: 500, borderRadius: '100px', padding: '4px 10px', color: 'rgba(235,67,38,0.8)', background: 'rgba(235,67,38,0.07)', border: '1px solid rgba(235,67,38,0.15)' }}>Inventory</span>
                      <span style={{ fontSize: '9.5px', fontWeight: 500, borderRadius: '100px', padding: '4px 10px', color: 'rgba(235,67,38,0.8)', background: 'rgba(235,67,38,0.07)', border: '1px solid rgba(235,67,38,0.15)' }}>RAG knowledge</span>
                      <span style={{ fontSize: '9.5px', fontWeight: 500, borderRadius: '100px', padding: '4px 10px', color: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>CRM sync</span>
                    </div>
                  </div>
                </div>
                <div className="sv2-back">
                  <p className="sv2-back-label">&#x2713; Fixed with Six% Auto</p>
                  <h3 className="sv2-back-title">One System,<br />Everything in Sync</h3>
                  <p className="sv2-back-desc">EHR, inventory, leads and files, all connected, searchable and up to date. No more hunting across apps.</p>
                  <div className="sv2-items sv2-items-row">
                    <div className="sv2-item">EHR fully integrated</div>
                    <div className="sv2-item">Inventory tracked live</div>
                    <div className="sv2-item">RAG knowledge instantly searchable</div>
                    <div className="sv2-item">All records in one place</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* CTA button */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <a href="#contact" className="sv2-cta-btn">Book a Discovery Call &rarr;</a>
          </div>

        </div>
      </section>

      {/* Book a Call Modal */}
      <div
        id="sv2-modal"
        style={{ display: modalOpen ? 'flex' : 'none', position: 'fixed', inset: 0, zIndex: 9999, alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(6px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      >
        <div style={{ background: '#000', border: '1px solid rgba(255,34,0,0.45)', boxShadow: '0 0 40px rgba(255,34,0,0.15),0 40px 80px rgba(0,0,0,0.8)', borderRadius: '20px', padding: '48px', maxWidth: '480px', width: '90%', position: 'relative', textAlign: 'center' }}>
          <button onClick={closeModal} aria-label="Close modal" style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '22px', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,34,0,0.8)', margin: '0 0 16px' }}>Six% Auto</p>
          <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.03em', lineHeight: 1.15 }}>Let&apos;s build your system.</h3>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: '0 0 32px' }}>We&apos;ll map your friction, design your automation layer, and run it for you, from day one.</p>
          <a
            href="#contact"
            onClick={closeModal}
            style={{ display: 'inline-block', background: 'rgba(255,34,0,1)', color: '#fff', padding: '16px 40px', borderRadius: '100px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.01em', boxShadow: '0 0 24px rgba(255,34,0,0.4)', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
          >Book a Discovery Call</a>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', margin: '16px 0 0' }}>Free. No commitment. 30 minutes.</p>
        </div>
      </div>

      <style>{`
        .sv2-cta-btn {
          display: inline-block;
          background: rgba(255,34,0,1);
          color: #fff;
          padding: 16px 44px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.01em;
          box-shadow: 0 0 24px rgba(255,34,0,0.35);
          transition: opacity 0.2s, transform 0.2s;
        }
        .sv2-cta-btn:hover {
          opacity: 0.88;
          transform: translateY(-2px);
        }
        .sv2-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 280px 280px 280px;
          gap: 10px;
        }
        .sv2-card {
          perspective: 1000px;
          cursor: default;
          height: 100%;
        }
        .sv2-full { grid-column: 1 / -1; }
        .sv2-flipper {
          width: 100%; height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.23,1,0.32,1);
          border-radius: 28px;
        }
        .sv2-card:hover .sv2-flipper { transform: rotateY(180deg); }
        .sv2-card.sv2-flipped .sv2-flipper { transform: rotateY(180deg); }
        .sv2-front, .sv2-back {
          position: absolute; inset: 0;
          border-radius: 28px;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .sv2-front {
          background: #000;
          border: 1px solid rgba(255,34,0,0.45);
          box-shadow: 0 0 18px rgba(255,34,0,0.18), 0 20px 40px rgba(0,0,0,0.6);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 28px;
        }
        .sv2-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, #000 38%, transparent 70%);
          z-index: 1;
          pointer-events: none;
        }
        .sv2-num {
          position: absolute;
          top: 24px; right: 28px;
          font-size: 11px; font-weight: 700;
          color: #333;
          letter-spacing: 0.05em;
          z-index: 3;
        }
        .sv2-front-body {
          position: relative;
          z-index: 2;
        }
        .sv2-cat {
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,34,0,0.7);
          margin: 0 0 8px;
        }
        .sv2-title {
          font-size: clamp(20px,2.2vw,28px);
          font-weight: 800; color: #fff;
          letter-spacing: -0.035em; line-height: 1.1;
          margin: 0 0 8px;
        }
        .sv2-desc {
          font-size: 11.5px;
          color: rgba(255,255,255,0.28);
          line-height: 1.65; margin: 0;
          max-width: 320px;
        }
        .sv2-back {
          transform: rotateY(180deg);
          background: #000;
          border: 1px solid rgba(0,255,100,0.45);
          box-shadow: 0 0 18px rgba(0,255,100,0.15), 0 20px 40px rgba(0,0,0,0.6);
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: 28px;
        }
        .sv2-back::after {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,255,100,0.5), transparent);
        }
        .sv2-back-label {
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #00ff64;
        }
        .sv2-back-title {
          font-size: clamp(18px,2vw,24px);
          font-weight: 800; color: #fff;
          letter-spacing: -0.03em; line-height: 1.15;
        }
        .sv2-back-desc {
          font-size: 12px; color: rgba(255,255,255,0.38);
          line-height: 1.7;
        }
        .sv2-items { display: flex; flex-direction: column; gap: 8px; }
        .sv2-items-row { flex-direction: row; flex-wrap: wrap; gap: 8px 24px; }
        .sv2-item {
          display: flex; align-items: center;
          gap: 10px; font-size: 11.5px;
          color: rgba(255,255,255,0.6);
        }
        .sv2-item::before {
          content: '';
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #00ff64;
          box-shadow: 0 0 8px rgba(0,255,100,0.9);
          flex-shrink: 0;
        }
        @media (max-width: 600px) {
          .sv2-grid { grid-template-columns: 1fr; grid-template-rows: none; }
          .sv2-full { grid-column: 1; }
          .sv2-card { min-height: 280px; }
        }
      `}</style>
    </>
  );
}
