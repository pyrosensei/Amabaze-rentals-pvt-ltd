import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, PhoneCall, ShieldCheck, ArrowRight, Search } from 'lucide-react';
import styles from './Header.module.css';
import logo from '../../assets/logo.jpeg';
import TrackModal from '../TrackModal/TrackModal';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Network', href: '#presence' },
    { name: 'Safety', href: '#safety' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <motion.div className={styles.scrollProgress} style={{ scaleX: progressScaleX }} />
      <div className={styles.container}>
        <motion.a
          href="#top"
          className={styles.logoContainer}
          onClick={(e) => {
            e.preventDefault();
            closeMobileMenu();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img src={logo} alt="Amabze Rentals Logo" className={styles.logoImage} />
          <div className={styles.brandMeta}>
            <div className={styles.brandTitleRow}>
              <span className={styles.companyName}>AMABZE RENTALS</span>
              <span className={styles.panIndiaBadge}>PAN-INDIA</span>
            </div>
            <span className={styles.brandSub}>Corporate Chauffeur & Fleet Solutions</span>
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className={styles.navLink}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.headerTrackBtn}
              onClick={() => setIsTrackOpen(true)}
              title="Track Booking Status by Reference ID"
            >
              <Search size={13} />
              <span>Track Trip</span>
            </button>

            <a href="tel:+917982265845" className={styles.headerPhone} title="24/7 Operations Desk">
              <PhoneCall size={13} />
              <span>0124 4974856</span>
            </a>

            <motion.a
              href="#contact"
              className={styles.ctaButton}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Get Proposal</span>
              <ArrowRight size={14} />
            </motion.a>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.mobileMenuToggle}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileOverlay}
            onClick={closeMobileMenu}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileDrawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          >
            <div className={styles.drawerHeader}>
              <div className={styles.drawerBrand}>
                <img src={logo} alt="Amabze" className={styles.drawerLogo} />
                <div>
                  <div className={styles.drawerTitle}>AMABZE RENTALS</div>
                  <div className={styles.drawerSub}>Pan-India Corporate Mobility</div>
                </div>
              </div>
              <button className={styles.drawerClose} onClick={closeMobileMenu} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <nav className={styles.mobileNav}>
              <ul className={styles.mobileNavList}>
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={styles.mobileNavLink}
                      onClick={closeMobileMenu}
                    >
                      <span>{link.name}</span>
                      <ArrowRight size={15} className={styles.mobileNavArrow} />
                    </a>
                  </li>
                ))}
              </ul>

              <div className={styles.drawerFooter}>
                <div className={styles.complianceTag}>
                  <ShieldCheck size={14} />
                  <span>100% Statutory Compliant • CIN: U34300HR2022PTC102048</span>
                </div>
                <a
                  href="tel:+917982265845"
                  className={styles.mobilePhoneButton}
                  onClick={closeMobileMenu}
                >
                  <PhoneCall size={16} />
                  <span>24/7 Desk: +91 79822 65845</span>
                </a>
                <a
                  href="#contact"
                  className={styles.mobileCtaButton}
                  onClick={closeMobileMenu}
                >
                  Request Corporate Proposal
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Booking Tracker Modal */}
      <TrackModal isOpen={isTrackOpen} onClose={() => setIsTrackOpen(false)} />
    </header>
  );
}
