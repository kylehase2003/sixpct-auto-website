'use client';

import { useEffect } from 'react';

export default function Solution() {
  useEffect(() => {
    const rows = document.querySelectorAll<HTMLElement>('#solution .p1-animate');
    if (!rows.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const idx = Array.prototype.indexOf.call(rows, el);
          setTimeout(() => el.classList.add('p1-visible'), idx * 100);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="solution" style={{ background: '#000', color: '#fff', fontFamily: "'Inter','Helvetica Neue',sans-serif", padding: '80px 40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: 'clamp(64px, 12vw, 150px)', fontWeight: 950, color: '#26eb5d', letterSpacing: '-0.06em', textTransform: 'uppercase', lineHeight: 0.9, margin: 0, textShadow: '0 0 30px rgba(38, 235, 93, 0.4), 0 0 60px rgba(38, 235, 93, 0.15)' }}>THE SOLUTION</h2>
            <h3 style={{ fontSize: 'clamp(18px, 4vw, 46px)', fontWeight: 800, color: '#fff', letterSpacing: '0.18em', margin: '16px 0 0', textTransform: 'uppercase', textShadow: '0 0 20px rgba(255, 255, 255, 0.35), 0 0 40px rgba(255, 255, 255, 0.15)', opacity: 0.95, width: 'fit-content' }}>The Intelligent Execution Layer</h3>
            <div style={{ marginTop: '40px', padding: '32px 48px', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', maxWidth: '740px', background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(5px)' }}>
              <p style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: '#fff', lineHeight: 1.6, margin: 0, fontWeight: 400, opacity: 0.9 }}>A system sits on top of your existing tools and connects them. It doesn&apos;t suggest what to do. <strong>It does it.</strong> Your team stops handling every step and starts checking results.</p>
            </div>
          </div>

          {/* Row 1 */}
          <div className="p2-row p1-animate">
            <div className="p2-box">Time becomes unlimited</div>
            <p className="p2-desc">Automation handles the volume. You handle the strategy. Scaling no longer requires linear time.</p>
          </div>

          <div className="p2-connector"><div className="p2-cline"></div><span className="p2-chevron">&#x203A;&#x203A;</span></div>

          {/* Row 2 */}
          <div className="p2-row p1-animate">
            <p className="p2-desc">Volume can multiply without adding a single headcount. Your systems grow, not your payroll.</p>
            <div className="p2-box">Scale without hiring</div>
          </div>

          <div className="p2-connector"><div className="p2-cline"></div><span className="p2-chevron">&#x203A;&#x203A;</span></div>

          {/* Row 3 */}
          <div className="p2-row p1-animate">
            <div className="p2-box">Nothing falls through</div>
            <p className="p2-desc">Every trigger is captured, every follow-up is sent, every task is assigned. Perfect execution, every time.</p>
          </div>

          <div className="p2-connector"><div className="p2-cline"></div><span className="p2-chevron">&#x203A;&#x203A;</span></div>

          {/* Row 4 */}
          <div className="p2-row p1-animate">
            <p className="p2-desc">Machines execute the same process identically, every single time. 100% fidelity, zero human error.</p>
            <div className="p2-box">Errors are eliminated</div>
          </div>

          <div className="p2-connector"><div className="p2-cline"></div><span className="p2-chevron">&#x203A;&#x203A;</span></div>

          {/* Row 5 */}
          <div className="p2-row p1-animate">
            <div className="p2-box">Cost decouples from growth</div>
            <p className="p2-desc">As the business grows, operational cost stays flat or decreases. Your margins expand as you scale.</p>
          </div>

          {/* Stat boxes */}
          <div className="p2-stats p1-animate">
            <div className="p2-stat"><div className="p2-stat-num">90%</div><div className="p2-stat-label">reduction in processing time across departments</div></div>
            <div className="p2-stat"><div className="p2-stat-num">100%</div><div className="p2-stat-label">data accuracy across all integrated platforms</div></div>
            <div className="p2-stat"><div className="p2-stat-num">5X</div><div className="p2-stat-label">volume increase supported with zero added headcount</div></div>
          </div>

        </div>
      </div>
    </section>
  );
}
