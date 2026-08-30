import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Showcase from './components/Showcase/Showcase';
import Stats from './components/Stats/Stats';
import About from './components/About/About';
import Services from './components/Services/Services';
import Fleet from './components/Fleet/Fleet';
import Clients from './components/Clients/Clients';
import Safety from './components/Safety/Safety';
import Presence from './components/Presence/Presence';
import FAQ from './components/FAQ/FAQ';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import FloatingCTA from './components/FloatingCTA/FloatingCTA';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import Dashboard from './pages/Dashboard/Dashboard';
import { EASE } from './lib/motion';

function MarketingPage({ selectedVehicle, onSelectVehicle }) {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Showcase />
        <Stats />
        <About />
        <Services />
        <Fleet onSelectVehicle={onSelectVehicle} />
        <Clients />
        <Safety />
        <Presence />
        <FAQ />
        <Contact selectedVehicle={selectedVehicle} />
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
      <FloatingCTA />
    </>
  );
}

function MarketingPageWithVehicle() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <MarketingPage
      selectedVehicle={selectedVehicle}
      onSelectVehicle={setSelectedVehicle}
    />
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25, ease: EASE }}
      >
        <Routes location={location}>
          <Route path="/" element={<MarketingPageWithVehicle />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return <AnimatedRoutes />;
}