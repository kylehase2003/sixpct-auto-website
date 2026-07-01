import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Privacy Policy | Six% Auto',
  description: 'How Six% Auto collects, uses, and protects your information.',
};

export default function PrivacyPolicy() {
  return (
    <>
      <Nav />
      <main style={{ background: '#000', color: '#fff', fontFamily: "'Inter','Helvetica Neue',sans-serif", minHeight: '100vh' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '160px 24px 120px' }}>

          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#eb4326', marginBottom: '16px' }}>Legal</p>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 950, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '12px' }}>Privacy Policy</h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginBottom: '48px' }}>Last updated: July 1, 2026</p>

          <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px' }}>Overview</h2>
            <p style={{ margin: '0 0 24px' }}>Six% Auto ("we", "us", "our") operates the website at sixpct.com. This policy explains what information we collect when you visit our site or submit an inquiry, and how we use it. We keep it simple: we collect only what we need, we do not sell your data, and we do not spam you.</p>

            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px' }}>What We Collect</h2>
            <p style={{ margin: '0 0 24px' }}>When you submit the contact form on our site, we collect your first name, business email address, company name, and any message you choose to include. We do not collect payment information, passwords, or any sensitive personal data through this site.</p>

            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px' }}>How We Use It</h2>
            <p style={{ margin: '0 0 24px' }}>We use the information you submit exclusively to respond to your inquiry, schedule a discovery call if requested, and follow up about our services. We will never sell, rent, or share your information with third parties for marketing purposes.</p>

            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px' }}>Cookies</h2>
            <p style={{ margin: '0 0 24px' }}>Our site may use basic analytics cookies to understand how visitors interact with the page. These cookies do not identify you personally. You can disable cookies in your browser settings at any time.</p>

            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px' }}>Data Storage</h2>
            <p style={{ margin: '0 0 24px' }}>Form submissions are stored securely and accessed only by the Six% Auto team. We retain your contact information only as long as necessary to respond to and manage your inquiry.</p>

            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px' }}>Your Rights</h2>
            <p style={{ margin: '0' }}>You have the right to request access to the personal data we hold about you, ask us to correct or delete it, or opt out of any further communication. To exercise any of these rights, or if you have questions about this policy, email us at <a href="mailto:team@sixpct.com" style={{ color: '#eb4326', textDecoration: 'none' }}>team@sixpct.com</a>.</p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
