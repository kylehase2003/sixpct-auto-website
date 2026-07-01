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
          <h5>Platform</h5>
          <a href="#">Home</a>
          <a href="#new-services">Services</a>
          <a href="#where-we-come-in">Capabilities</a>
        </div>
        <div className="footer-links">
          <h5>Connect</h5>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Six% Auto. All rights reserved.</span>
        <div>
          <a href="#" style={{ marginRight: '20px' }}>Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
