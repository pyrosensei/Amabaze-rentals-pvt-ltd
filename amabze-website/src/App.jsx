import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Stats from './components/Stats/Stats';
import About from './components/About/About';
import Services from './components/Services/Services';
import Fleet from './components/Fleet/Fleet';
import Clients from './components/Clients/Clients';
import Safety from './components/Safety/Safety';
import Presence from './components/Presence/Presence';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Fleet />
        <Clients />
        <Safety />
        <Presence />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}