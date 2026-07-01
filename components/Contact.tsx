'use client';

export default function Contact() {
  return (
    <section id="contact">
      <div className="container text-center">
        <span className="section-label reveal" style={{ color: '#E8390E' }}>CONTACT</span>
        <h2 className="section-title reveal">Ready to start executing?</h2>
        <p className="reveal" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginBottom: '64px', maxWidth: '720px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.6' }}>
          Book an honest conversation. No pitch decks. No sales pressure. Just a technical deep-dive into where the System fits your operations.
        </p>
        <form className="inline-form reveal" onSubmit={(event) => { event.preventDefault(); alert('Request received.'); }}>
          <label htmlFor="contact-name" className="sr-only">First Name</label>
          <input id="contact-name" type="text" className="form-input" placeholder="First Name" required />
          <label htmlFor="contact-email" className="sr-only">Business Email</label>
          <input id="contact-email" type="email" className="form-input" placeholder="Business Email" required />
          <label htmlFor="contact-company" className="sr-only">Company Name</label>
          <input id="contact-company" type="text" className="form-input" placeholder="Company Name" required />
          <button type="submit" className="cta-btn" style={{ borderRadius: '12px', background: '#E8390E', border: 'none', padding: '0 40px', height: '60px' }}>
            Send Request
          </button>
        </form>
        <p className="reassurance reveal">SECURE SYSTEM INTAKE · MANAGED INTEGRATION · ZERO UPFRONT COST</p>
      </div>
    </section>
  );
}
