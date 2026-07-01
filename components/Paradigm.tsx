'use client';

import { useEffect } from 'react';

export default function Paradigm() {
  useEffect(() => {
    const rows = document.querySelectorAll<HTMLElement>('.p1-animate');
    if (!rows.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const idx = Array.prototype.indexOf.call(rows, el);
          setTimeout(function () { el.classList.add('p1-visible'); }, idx * 100);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    rows.forEach(function (row) { observer.observe(row); });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="paradigm" style={{ background: '#000', color: '#fff', fontFamily: "'Inter','Helvetica Neue',sans-serif", padding: '60px 40px 120px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontSize: 'clamp(64px, 12vw, 150px)', fontWeight: 950, color: '#eb4326', letterSpacing: '-0.06em', textTransform: 'uppercase', lineHeight: 0.9, margin: 0, textShadow: '0 0 30px rgba(235, 67, 38, 0.4), 0 0 60px rgba(235, 67, 38, 0.15)' }}>THE REALITY</h2>
          <h3 style={{ fontSize: 'clamp(18px, 4vw, 46px)', fontWeight: 800, color: '#fff', letterSpacing: '0.18em', margin: '16px 0 0', textTransform: 'uppercase', textShadow: '0 0 20px rgba(255, 255, 255, 0.35), 0 0 40px rgba(255, 255, 255, 0.15)', opacity: 0.95, width: 'fit-content' }}>The Human-as-Glue Model</h3>
          <div style={{ marginTop: '40px', padding: '32px 48px', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', maxWidth: '740px', background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(5px)' }}>
            <p style={{ fontSize: '16px', color: '#fff', lineHeight: 1.8, margin: 0, fontWeight: 400, textShadow: '0 1px 2px rgba(0,0,0,0.5)', opacity: 0.9 }}>Every traditional business runs on the same fundamental assumption — that human effort is the engine. People are hired to fill the gaps between systems, between departments, between decisions. The model works. <span style={{ fontWeight: 800, color: '#fff' }}>Until it doesn&apos;t.</span></p>
          </div>
        </div>


        {/* ═══ PART 1: THE OLD WAY ═══ */}
        <div style={{ marginBottom: '120px' }}>


          {/* Row 1: box left, text right */}
          <div className="p1-row p1-animate">
            <div className="p1-box">Time is finite</div>
            <p className="p1-desc">Every hour spent on repetitive execution is an hour not spent on growth</p>
          </div>

          <div className="p1-connector"><div className="p1-cline"></div><span className="p1-chevron">&#x203A;&#x203A;</span></div>

          {/* Row 2: text left, box right */}
          <div className="p1-row p1-animate">
            <p className="p1-desc">You can double your workload. You cannot double your workforce overnight.</p>
            <div className="p1-box">Humans are not scalable</div>
          </div>

          <div className="p1-connector"><div className="p1-cline"></div><span className="p1-chevron">&#x203A;&#x203A;</span></div>

          {/* Row 3: box left, text right */}
          <div className="p1-row p1-animate">
            <div className="p1-box">Memory is unreliable</div>
            <p className="p1-desc">Anything not written down, automated, or tracked gets forgotten</p>
          </div>

          <div className="p1-connector"><div className="p1-cline"></div><span className="p1-chevron">&#x203A;&#x203A;</span></div>

          {/* Row 4: text left, box right */}
          <div className="p1-row p1-animate">
            <p className="p1-desc">One manual mistake at the start of a process creates five problems downstream</p>
            <div className="p1-box">Errors compound</div>
          </div>

          <div className="p1-connector"><div className="p1-cline"></div><span className="p1-chevron">&#x203A;&#x203A;</span></div>

          {/* Row 5: box left, text right */}
          <div className="p1-row p1-animate">
            <div className="p1-box">Cost scales with volume</div>
            <p className="p1-desc">The more business you do, the more people you need. Margins never improve.</p>
          </div>

          <div className="p1-connector"><div className="p1-cline"></div><span className="p1-chevron">&#x203A;&#x203A;</span></div>

          {/* Stat boxes */}
          <div className="p1-stats p1-animate">
            <div className="p1-stat"><div className="p1-stat-num">22%</div><div className="p1-stat-label">of a knowledge worker&apos;s day lost to manual data transfer</div></div>
            <div className="p1-stat"><div className="p1-stat-num">40%</div><div className="p1-stat-label">of time spent searching for information instead of acting</div></div>
            <div className="p1-stat"><div className="p1-stat-num">$28k</div><div className="p1-stat-label">wasted per employee annually on manual entry</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
