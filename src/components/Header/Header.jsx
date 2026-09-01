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
      {/* Top Corporate Assurance Bar */}
      <div className={styles.topUtilityBar}>
        <div className={styles.topUtilityInner}>
          <div className={styles.topUtilityLeft}>
            <span className={styles.utilityDot} />
            <span className={styles.utilityText}>
              Govt. Registered Enterprise • CIN: U34300HR2022PTC102048 • 100% Statutory Compliant
            </span>
          </div>
          <div className={styles.topUtilityRight}>
            <span className={styles.utilityBadge}>24×7 Central Dispatch Active</span>
            <a href="tel:+917982265845" className={styles.utilityHotline}>
              <PhoneCall size={12} />
              <span>Priority Hotline: +91 79822 65845 / 0124 4974856</span>
            </a>
          </div>
        </div>
      </div>

      <motion.div className={styles.scrollProgress} style={{ scaleX: progressScaleX }} />

      {/* Main Header Container */}
      <div className={styles.mainHeader}>
        <div className={styles.container}>
          {/* Prominent Master Brand Lockup */}
          <motion.a
            href="#top"
            className={styles.logoContainer}
            onClick={(e) => {
              e.preventDefault();
              closeMobileMenu();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className={styles.logoBadge}>
              <img src={logo} alt="Amabze Rentals Pvt Ltd" className={styles.logoImage} />
            </div>
            <div className={styles.brandMeta}>
              <div className={styles.brandTitleRow}>
                <h1 className={styles.companyName}>
                  AMABZE RENTALS <span className={styles.companySuffix}>PVT. LTD.</span>
                </h1>
                <span className={styles.panIndiaBadge}>PAN-INDIA</span>
              </div>
              <p className={styles.brandSub}>Corporate Chauffeur Services & Fleet Leasing Across India</p>
            </div>
          </motion.a>

          {/* Desktop Navigation & Actions */}
          <div className={styles.desktopControls}>
            <nav className={styles.desktopNav} aria-label="Main Navigation">
              <ul className={styles.navList}>
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className={styles.navLink}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.headerActions}>
              <button
                type="button"
                className={styles.headerTrackBtn}
                onClick={() => setIsTrackOpen(true)}
                title="Track Booking Status by Reference ID"
              >
                <Search size={14} />
                <span>Track Trip</span>
              </button>

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
          </div>

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
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
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
