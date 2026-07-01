'use client';

import { useEffect } from 'react';

export default function WhereWeComeIn() {
  useEffect(() => {
    const cards = document.querySelectorAll('.wwc-card');
    const observerOptions = { threshold: 0.3 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-start');
        }
      });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));

    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, []);

  return (
    <>
      <section id="where-we-come-in" style={{ background: '#000', color: '#fff', fontFamily: "'Inter','Helvetica Neue',sans-serif", padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(42px, 8vw, 72px)', fontWeight: 950, marginBottom: '16px', color: '#fff', letterSpacing: '-0.03em' }}>HERE&apos;S WHERE WE COME IN.</h2>
          <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', color: '#888', fontWeight: 400, maxWidth: '760px', margin: '0 auto 100px', lineHeight: 1.6, opacity: 0.8 }}>
            We don&apos;t sell software. We build the system, wire it into your business, and run it for you.
          </p>

          <div className="wwc-grid">
            {/* Card 1 */}
            <div className="wwc-card" id="wwc-card-1">
              <div className="wwc-corner-num">01</div>
              <div className="wwc-top-row">
                <div className="wwc-icon">
                  <svg className="wwc-illustration" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g className="friction-nodes">
                      <path d="M20 20L40 10M40 10L70 15M70 15L80 40M80 40L50 50M50 50L20 40M20 40L20 20M40 10L50 30M20 20L50 30" stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />
                      <circle className="f-node" cx="20" cy="20" r="2.5" fill="white" fillOpacity="0.2" />
                      <circle className="f-node" cx="40" cy="10" r="2.5" fill="white" fillOpacity="0.2" />
                      <circle className="f-node" cx="70" cy="15" r="2.5" fill="white" fillOpacity="0.2" />
                      <circle className="f-node" cx="80" cy="40" r="2.5" fill="white" fillOpacity="0.2" />
                      <circle className="f-node" cx="50" cy="50" r="2.5" fill="white" fillOpacity="0.2" />
                      <circle className="f-node" cx="20" cy="40" r="2.5" fill="white" fillOpacity="0.2" />
                      <circle className="f-node" cx="50" cy="30" r="2.5" fill="white" fillOpacity="0.2" />
                      <circle className="f-node" cx="85" cy="20" r="2.5" fill="white" fillOpacity="0.2" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="wwc-content">
                <h3 className="wwc-title">We Map Your Friction</h3>
                <p className="wwc-desc">Every business leaks time and money in different places. We start by identifying exactly where yours does: bookings, admin, follow-ups, and support.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="wwc-card" id="wwc-card-2">
              <div className="wwc-corner-num">02</div>
              <div className="wwc-top-row">
                <div className="wwc-icon">
                  <svg className="wwc-illustration" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g className="cube-assembly">
                      <path stroke="white" strokeOpacity="0.1" strokeWidth="0.5" d="M50 10L75 22.5V47.5L50 60L25 47.5V22.5L50 10Z M50 10V35 M25 22.5L50 35L75 22.5" />
                      <path className="cube-path" pathLength="1" d="M50 10L75 22.5V47.5L50 60L25 47.5V22.5L50 10Z M50 10V35 M25 22.5L50 35L75 22.5" stroke="#E8390E" strokeWidth="2" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="wwc-content">
                <h3 className="wwc-title">We Build Your System</h3>
                <p className="wwc-desc">We build a custom system wired into how your business actually runs. It handles the repetitive work from start to finish.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="wwc-card" id="wwc-card-3">
              <div className="wwc-corner-num">03</div>
              <div className="wwc-top-row">
                <div className="wwc-icon">
                  <svg className="wwc-illustration" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g className="pipeline">
                      <line x1="10" y1="30" x2="90" y2="30" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
                      <rect x="25" y="26" width="8" height="8" fill="#000" stroke="white" strokeOpacity="0.3" strokeWidth="0.5" />
                      <rect x="46" y="26" width="8" height="8" fill="#000" stroke="white" strokeOpacity="0.3" strokeWidth="0.5" />
                      <rect x="67" y="26" width="8" height="8" fill="#000" stroke="white" strokeOpacity="0.3" strokeWidth="0.5" />
                      <circle className="pipe-pulse" cx="29" cy="30" r="1" fill="#E8390E" />
                      <circle className="pipe-pulse" cx="50" cy="30" r="1" fill="#E8390E" />
                      <circle className="pipe-pulse" cx="71" cy="30" r="1" fill="#E8390E" />
                      <circle className="pipe-dot" cx="-10" cy="30" r="3" fill="#E8390E" />
                      <circle className="pipe-dot dot-delayed" cx="-10" cy="30" r="3" fill="#E8390E" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="wwc-content">
                <h3 className="wwc-title">We Run It For You</h3>
                <p className="wwc-desc">This isn&apos;t a DIY tool you hand off. We handle setup, integration, monitoring, and refinement. You get the results without hiring anyone to make it happen.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="wwc-card" id="wwc-card-4">
              <div className="wwc-corner-num">04</div>
              <div className="wwc-top-row">
                <div className="wwc-icon">
                  <svg className="wwc-illustration" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g className="value-curve">
                      <path className="value-path" pathLength="1" d="M10 50C30 50 40 50 50 35C60 20 70 10 90 10" strokeWidth="4" strokeLinecap="round" fill="none" />
                      <linearGradient id="valueGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#E8390E" />
                        <stop offset="100%" stopColor="#00FF88" />
                      </linearGradient>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="wwc-content">
                <h3 className="wwc-title">You Keep the Value</h3>
                <p className="wwc-desc">Every hour recovered and every lead captured stays in your business. We turn operational waste back into profit margin from day one.</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <a href="#contact" className="btn-fill">Book a Discovery Call</a>
          </div>
        </div>
      </section>

      <style>{`
        .wwc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          text-align: left;
        }
        .wwc-card {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 28px;
          padding: 44px;
          min-height: 380px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .wwc-card:hover {
          border-color: rgba(232, 57, 14, 0.4);
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.04);
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
        }

        .wwc-corner-num {
          position: absolute;
          top: 28px;
          right: 32px;
          left: auto;
          font-size: 14px;
          font-weight: 950;
          color: rgba(232, 57, 14, 0.4);
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.05em;
          text-align: right;
          z-index: 20;
        }

        .wwc-icon {
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 80px;
        }
        .wwc-illustration {
          width: 100px;
          height: auto;
          opacity: 0.8;
          filter: drop-shadow(0 0 15px rgba(232, 57, 14, 0.3));
        }

        .wwc-title {
          font-size: clamp(28px, 4.5vw, 34px);
          font-weight: 950;
          color: #fff;
          margin-bottom: 12px;
          letter-spacing: -0.04em;
          line-height: 1.05;
        }
        .wwc-desc {
          font-size: 16px;
          color: rgba(255,255,255,0.73);
          line-height: 1.6;
          margin: 0;
          max-width: 420px;
          font-weight: 400;
        }

        .wwc-card {
          --glow-opacity: 0;
        }
        .wwc-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            500px circle at 50% 50%,
            rgba(232, 57, 14, 0.28) 0%,
            rgba(232, 57, 14, 0.08) 35%,
            transparent 70%
          );
          opacity: var(--glow-opacity);
          pointer-events: none;
          z-index: 1;
          transform: scale(0.9);
        }
        .wwc-card.animate-start::before {
          animation: spotlightSequence 8s infinite;
        }
        .wwc-card:nth-child(1).animate-start::before { animation-delay: 0s; }
        .wwc-card:nth-child(2).animate-start::before { animation-delay: 2s; }
        .wwc-card:nth-child(3).animate-start::before { animation-delay: 4s; }
        .wwc-card:nth-child(4).animate-start::before { animation-delay: 6s; }

        .wwc-card.animate-start .wwc-content {
          animation: textReveal 8s infinite;
        }

        .wwc-card:nth-child(1).animate-start .wwc-content { animation-delay: 0s; }
        .wwc-card:nth-child(2).animate-start .wwc-content { animation-delay: 2s; }
        .wwc-card:nth-child(3).animate-start .wwc-content { animation-delay: 4s; }
        .wwc-card:nth-child(4).animate-start .wwc-content { animation-delay: 6s; }

        @keyframes textReveal {
          0%, 30%, 80%, 100% { opacity: 0.4; transform: translateY(0); }
          10%, 25% { opacity: 1; transform: translateY(-3px); }
        }

        @keyframes spotlightSequence {
          0% { opacity: 0; transform: scale(0.9); }
          10% { opacity: 1; transform: scale(1.03); }
          25% { opacity: 1; transform: scale(1.05); }
          40% { opacity: 0.1; transform: scale(1); }
          100% { opacity: 0.1; transform: scale(1); }
        }

        .wwc-card > * { position: relative; z-index: 10; }

        @media (max-width: 900px) {
          .wwc-grid { grid-template-columns: 1fr; gap: 20px; }
          .wwc-card { min-height: 340px; padding: 32px; }
          #where-we-come-in { padding: 80px 24px; }
        }

        /* Animation Styles */
        .wwc-card.animate-start .f-node { animation: nodeGlow 4s infinite cubic-bezier(0.4, 0, 0.2, 1); }
        .wwc-card.animate-start .f-node:nth-child(2) { animation-delay: 0.2s; }
        .wwc-card.animate-start .f-node:nth-child(3) { animation-delay: 0.4s; }
        .wwc-card.animate-start .f-node:nth-child(4) { animation-delay: 0.6s; }
        .wwc-card.animate-start .f-node:nth-child(5) { animation-delay: 0.8s; }
        .wwc-card.animate-start .f-node:nth-child(6) { animation-delay: 1.0s; }
        .wwc-card.animate-start .f-node:nth-child(7) { animation-delay: 1.2s; }
        .wwc-card.animate-start .f-node:nth-child(8) { animation-delay: 1.4s; }

        @keyframes nodeGlow {
          0%, 20%, 80%, 100% { fill: white; fill-opacity: 0.2; transform: scale(1); filter: none; }
          45%, 55% { fill: #E8390E; fill-opacity: 1; transform: scale(1.3); filter: drop-shadow(0 0 10px rgba(232, 57, 14, 0.6)); }
        }

        .cube-path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
        }
        .wwc-card.animate-start .cube-path { animation: drawCube 6s infinite cubic-bezier(0.65, 0, 0.35, 1); }

        @keyframes drawCube {
          0% { stroke-dashoffset: 1; }
          35%, 65% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 1; }
        }

        .pipe-dot { opacity: 0; }
        .wwc-card.animate-start .pipe-dot { animation: pipeFlow 4s infinite cubic-bezier(0.4, 0, 0.2, 1); }
        .wwc-card.animate-start .dot-delayed { animation-delay: 2s; }

        @keyframes pipeFlow {
          0% { cx: -10; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { cx: 110; opacity: 0; }
        }

        .wwc-card.animate-start .pipe-pulse { animation: pulseCore 1s infinite alternate ease-in-out; }
        @keyframes pulseCore {
          from { opacity: 0.2; r: 1; }
          to { opacity: 1; r: 1.5; filter: blur(1px); }
        }

        .value-path {
          stroke: url(#valueGradient);
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
        }
        .wwc-card.animate-start .value-path { animation: drawCurve 6s infinite cubic-bezier(0.65, 0, 0.35, 1); }

        @keyframes drawCurve {
          0% { stroke-dashoffset: 1; }
          35%, 65% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 1; }
        }
      `}</style>
    </>
  );
}
