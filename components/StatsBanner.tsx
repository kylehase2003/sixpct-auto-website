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
      <section style={{ background: '#000', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, color: '#fff', margin: '0 0 28px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>This Is Not &ldquo;Just <span style={{ color: '#74AA9C', textShadow: '0 0 20px rgba(116,170,156,0.6), 0 0 40px rgba(116,170,156,0.3)' }}>ChatGPT</span>&rdquo;<br /><span style={{ color: '#E8390E', fontSize: '0.6em' }}>Most businesses use AI as a toy. But it is A MACHINE!</span></h2>
        <p style={{ fontSize: 'clamp(15px,2vw,18px)', fontWeight: 400, color: 'rgba(255,255,255,0.5)', maxWidth: '680px', margin: '0 auto', lineHeight: 1.65 }}>
          Before we show you what&apos;s possible, here&apos;s what most businesses are still doing.
        </p>
      </section>

      {/* STATS BANNER */}
      <div className="stats-banner-wrap">
        <div className="stats-banner-card" ref={cardRef}>
          <h2 className="stats-banner-heading">The Numbers Don&apos;t Lie</h2>
          <p className="stats-banner-sub">Most businesses try AI and see nothing. The ones that build it in right see this.</p>
          <div className="stats-banner-grid">
            <div className="stats-banner-item">
              <span className="stats-value">1 in 3</span>
              <span className="stats-label">of businesses that try AI never actually roll it out company-wide</span>
            </div>
            <div className="stats-banner-item">
              <span className="stats-value">$5,000+</span>
              <span className="stats-label">saved per employee annually by automating admin tasks</span>
            </div>
            <div className="stats-banner-item">
              <span className="stats-value">15%</span>
              <span className="stats-label">less overhead when AI handles the repetitive work</span>
            </div>
            <div className="stats-banner-item">
              <span className="stats-value">70%</span>
              <span className="stats-label">drop in support costs when AI handles repeat questions</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
