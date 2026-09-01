import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import styles from './Footer.module.css';
import logo from '../../assets/logo.jpeg';

export default function Footer() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Contact', href: '#contact' },
  ];

  const contactItems = [
    {
      icon: MapPin,
      content: (
        <span className={styles.contactText}>
          No-S 4, Leisure Valley Park, Huda Market, Sector-29,<br />
          Opp. Kingdom of Dreams, Gurugram, Haryana - 122002
        </span>
      ),
    },
    {
      icon: Phone,
      content: (
        <div className={styles.phoneNumbers}>
          <a href="tel:+917982265845" className={styles.link}>+91 7982265845</a>
          <span className={styles.separator}>, </span>
          <a href="tel:+918826716382" className={styles.link}>+91 8826716382</a>
          <br />
          <a href="tel:01244974856" className={styles.link}>0124 4974856</a>
        </div>
      ),
    },
    {
      icon: Mail,
      content: (
        <a href="mailto:reservation@amabzerentals.com" className={styles.link}>
          reservation@amabzerentals.com
        </a>
      ),
    },
  ];

  return (
    <motion.footer
      ref={ref}
      className={styles.footer}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.container}>
        <motion.div
          className={styles.grid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Column 1: Company Info */}
          <motion.div className={styles.column}>
            <motion.div
              className={styles.brand}
              whileHover={{ scale: 1.01 }}
            >
              <img src={logo} alt="Amabze Rentals Logo" className={styles.logoImage} loading="lazy" />
              <div>
                <span className={styles.companyName}>AMABZE RENTALS</span>
                <span className={styles.companySuffix}> PVT. LTD.</span>
              </div>
            </motion.div>
            <motion.p className={styles.description}>
              Professional chauffeur services and corporate mobility solutions across India.
            </motion.p>
            <motion.p className={styles.cin}>CIN: U34300HR2022PTC102048</motion.p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div className={styles.column}>
            <motion.h3 className={styles.heading}>Quick Links</motion.h3>
            <motion.ul className={styles.linkList}>
              {quickLinks.map((link, index) => (
                <motion.li key={link.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * index }}>
                  <motion.a
                    href={link.href}
                    className={styles.link}
                    whileHover={{ x: 4, color: 'var(--color-brand-400)' }}
                  >
                    {link.name}
                    <ArrowRight size={14} className={styles.linkArrow} />
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div className={styles.column}>
            <motion.h3 className={styles.heading}>Contact</motion.h3>
            <motion.ul className={styles.contactList}>
              {contactItems.map((item, index) => (
                <motion.li key={index} className={styles.contactItem} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * index }}>
                  <motion.div className={styles.iconWrapper}>
                    <item.icon size={20} className={styles.icon} />
                  </motion.div>
                  <motion.div className={styles.contactContent}>
                    {item.content}
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className={styles.bottomBar}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <motion.p className={styles.copyright}>
            © 2026 Amabze Rentals Pvt. Ltd. All Rights Reserved.
          </motion.p>
          <motion.p className={styles.tagline}>"Travel Safe With Us"</motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}