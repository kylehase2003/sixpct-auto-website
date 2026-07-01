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
      {/* <Reviews /> */}
      <About />
      <Contact />
</main>
      <Footer />
    </>
  );
}
