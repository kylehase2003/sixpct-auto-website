import Nav from '../components/Nav';
import Hero from '../components/Hero';
import StatsBanner from '../components/StatsBanner';
import Paradigm from '../components/Paradigm';
import Calculator from '../components/Calculator';
import Solution from '../components/Solution';
import WhereWeComeIn from '../components/WhereWeComeIn';
import Services from '../components/Services';
import Reviews from '../components/Reviews';
import About from '../components/About';
import Contact from '../components/Contact';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import RevealObserver from '../components/RevealObserver';

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Nav />
      <main>
      <Hero />
      <StatsBanner />
      <Paradigm />
      <Calculator />
      <Solution />
      <WhereWeComeIn />
      <Services />
      <Reviews />
      {/* Ready to automate card */}
      <div className="notion-card reveal"
        style={{ justifyContent: 'center', background: '#080808', margin: '48px auto', maxWidth: '1200px', minHeight: 'auto', padding: '64px' }}>
        <div style={{ textAlign: 'center' }}>
          <h3 className="notion-title" style={{ fontSize: '32px', marginBottom: '32px' }}>Ready to automate?</h3>
          <a href="#contact" className="pill-btn" style={{ width: 'fit-content' }}>Book a Call</a>
        </div>
      </div>
      <About />
      <Contact />
      <CTA />
      </main>
      <Footer />
    </>
  );
}
