export default function About() {
  return (
    <section id="about" className="bg-surface">
      <div className="container text-center">
        <span className="section-label reveal">ABOUT</span>
        <h2 className="section-title reveal">Built for how businesses actually work.</h2>
        <div className="snapshot-content reveal">
          <p>Six% Auto is built for businesses where execution slows down not because work is hard, but because it
            is fragmented, repetitive, and poorly coordinated.</p>
          <p>It is not a DIY tool. Setup, integration, optimization, and ongoing refinement — all handled. Full
            visibility. Full control.</p>
        </div>
        <div className="stat-row reveal">
          <div className="stat-item">
            <h4>24/7</h4>
            <p>Always on, never delayed.</p>
          </div>
          <div className="stat-item">
            <h4>Managed</h4>
            <p>Setup &amp; integration included.</p>
          </div>
          <div className="stat-item">
            <h4>Zero</h4>
            <p>Internal IT overhead.</p>
          </div>
        </div>
        <div className="reveal">
          <a href="#contact" className="learn-more">Get in Touch →</a>
        </div>
      </div>
    </section>
  );
}
