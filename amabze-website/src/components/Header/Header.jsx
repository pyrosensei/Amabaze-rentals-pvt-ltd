import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';
import logo from '../../assets/logo.jpeg';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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
    { name: 'Presence', href: '#presence' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <motion.a
          href="#"
          className={styles.logoContainer}
          onClick={closeMobileMenu}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img src={logo} alt="Amabze Rentals Logo" className={styles.logoImage} />
          <span className={styles.companyName}>AMABZE RENTALS</span>
        </motion.a>

        {/* Desktop Navigation */}
        <motion.nav
          className={styles.desktopNav}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <ul className={styles.navList}>
            {navLinks.map((link, index) => (
              <motion.li key={link.name} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * (index + 1), duration: 0.3 }}>
                <motion.a
                  href={link.href}
                  className={styles.navLink}
                  whileHover={{ color: 'var(--color-brand-600)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              </motion.li>
            ))}
          </ul>
          <motion.a
            href="#contact"
            className={styles.ctaButton}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px -5px rgba(14, 90, 167, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            Request Quote
          </motion.a>
        </motion.nav>

        {/* Mobile Menu Toggle */}
        <motion.button
          className={styles.mobileMenuToggle}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
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
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        <motion.div
          className={styles.mobileDrawer}
          initial={{ x: '100%' }}
          animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <nav className={styles.mobileNav}>
            <motion.ul className={styles.mobileNavList} initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}>
              {navLinks.map((link) => (
                <motion.li key={link.name} variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}>
                  <motion.a
                    href={link.href}
                    className={styles.mobileNavLink}
                    onClick={closeMobileMenu}
                    whileHover={{ x: 8, color: 'var(--color-brand-600)' }}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
            <motion.a
              href="#contact"
              className={styles.mobileCtaButton}
              onClick={closeMobileMenu}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              Request Quote
            </motion.a>
          </nav>
        </motion.div>
      </AnimatePresence>
    </header>
  );
}