'use client';

import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch('https://formspree.io/f/xlgypnnj', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 2700);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact">
      {/* Success overlay */}
      {status === 'success' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.7)',
            animation: 'blurOverlay 2.5s linear forwards',
          }} />
          <div style={{
            position: 'relative', zIndex: 1,
            background: '#111', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px',
            padding: '20px 32px',
            display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.8)',
            animation: 'popupRide 2.5s linear forwards',
            whiteSpace: 'nowrap',
          }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#26eb5d', display: 'block', flexShrink: 0 }}></span>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#fff' }}>We will be with you shortly.</p>
          </div>
        </div>
      )}

      <div className="container text-center">
        <span className="section-label reveal" style={{ color: '#E8390E' }}>CONTACT</span>
        <h2 className="section-title reveal">Ready to start executing?</h2>
        <p className="reveal" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginBottom: '64px', maxWidth: '720px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.6' }}>
          Book an honest conversation. No pitch decks. No sales pressure. Just a technical deep-dive into where the System fits your operations.
        </p>

        <form className="contact-form reveal" onSubmit={handleSubmit}>
          <div className="contact-form-row">
            <label htmlFor="contact-name" className="sr-only">First Name</label>
            <input id="contact-name" name="name" type="text" className="form-input" placeholder="First Name" required />
            <label htmlFor="contact-email" className="sr-only">Business Email</label>
            <input id="contact-email" name="email" type="email" className="form-input" placeholder="Business Email" required />
          </div>
          <label htmlFor="contact-message" className="sr-only">What are you struggling with?</label>
          <textarea id="contact-message" name="message" className="form-input" placeholder="What's slowing your business down? Give us a quick picture." rows={4} style={{ resize: 'none', lineHeight: '1.6' }} required />
          <button type="submit" className="cta-btn" style={{ borderRadius: '12px', background: '#E8390E', border: 'none', padding: '0 40px', height: '60px', width: '100%', textAlign: 'center', justifyContent: 'center' }} disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending...' : 'Send Request'}
          </button>
        </form>

        {status === 'error' && (
          <p style={{ marginTop: '16px', color: '#eb4326', fontSize: '14px' }}>Something went wrong. Please try again or email team@sixpct.com directly.</p>
        )}

        <p className="reassurance reveal">PRIVATE · FULLY MANAGED · NO UPFRONT COST</p>
      </div>

      <style>{`
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 620px;
          margin: 0 auto 32px;
        }
        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @keyframes popupRide {
          0%   { transform: translateY(100vh); animation-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1); }
          16%  { transform: translateY(0);     animation-timing-function: linear; }
          91%  { transform: translateY(0);     animation-timing-function: cubic-bezier(0.8, 0.0, 1.0, 1); }
          100% { transform: translateY(100vh); }
        }
        @keyframes blurOverlay {
          0%   { opacity: 0;   backdrop-filter: blur(0px);  animation-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1); }
          16%  { opacity: 1;   backdrop-filter: blur(14px); animation-timing-function: linear; }
          91%  { opacity: 1;   backdrop-filter: blur(14px); animation-timing-function: cubic-bezier(0.8, 0.0, 1.0, 1); }
          100% { opacity: 0;   backdrop-filter: blur(0px);  }
        }
        @media (max-width: 600px) {
          .contact-form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
