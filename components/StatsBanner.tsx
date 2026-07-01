'use client';

import { useRef, useEffect } from 'react';

export default function StatsBanner() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
      card.style.setProperty('--glow-opacity', '1');
    };

    const onMouseLeave = () => {
      card.style.setProperty('--glow-opacity', '0');
    };

    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* SYSTEM SECTION HEADER */}
      <section style={{ background: '#000', padding: '120px 24px 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 900, color: '#fff', margin: '0 0 28px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>This Is Not &ldquo;Just ChatGPT&rdquo;<br /><span style={{ color: '#E8390E', fontSize: '0.6em' }}>Most businesses use AI as a toy. But it is A MACHINE!</span></h2>
        <p style={{ fontSize: 'clamp(15px,2vw,18px)', fontWeight: 400, color: 'rgba(255,255,255,0.5)', maxWidth: '680px', margin: '0 auto', lineHeight: 1.65 }}>
          To understand the power of a System, we first have to look at how most companies operate today.
        </p>
      </section>

      {/* STATS BANNER */}
      <div className="stats-banner-wrap">
        <div className="stats-banner-card" ref={cardRef}>
          <h2 className="stats-banner-heading">Beyond the Hype: Real AI Integration</h2>
          <p className="stats-banner-sub">While many use AI, few have mastered it. For small and medium businesses, integrated AI means direct, measurable savings.</p>
          <div className="stats-banner-grid">
            <div className="stats-banner-item">
              <span className="stats-value">1 in 3</span>
              <span className="stats-label">organizations have successfully scaled AI across their entire business</span>
            </div>
            <div className="stats-banner-item">
              <span className="stats-value">$5,000+</span>
              <span className="stats-label">saved per employee annually by automating admin tasks</span>
            </div>
            <div className="stats-banner-item">
              <span className="stats-value">15%</span>
              <span className="stats-label">lower overhead for businesses that integrate AI into core operations</span>
            </div>
            <div className="stats-banner-item">
              <span className="stats-value">70%</span>
              <span className="stats-label">reduction in support costs using AI for repetitive customer inquiries</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
