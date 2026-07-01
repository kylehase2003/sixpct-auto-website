export default function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div>
          <a href="/" className="logo" style={{ marginBottom: '20px' }}>
            <img src="/images/logo.png" alt="SIX% AUTO" style={{ height: '32px' }} />
          </a>
          <p className="footer-tagline">Automation for execution, not speculation.</p>
        </div>
        <div className="footer-links">
          <h5>Navigate</h5>
          <a href="#where-we-come-in">How It Works</a>
          <a href="#services-v2">Services</a>
          <a href="#manual-tax">Calculator</a>
          <a href="#about">About</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Six% Auto. All rights reserved.</span>
        <div>
          <a href="/privacy" style={{ marginRight: '20px' }}>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
