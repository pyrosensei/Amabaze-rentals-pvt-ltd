import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Send } from 'lucide-react';
import styles from './FloatingCTA.module.css';

export default function FloatingCTA() {
  return (
    <motion.div
      className={styles.floatingContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <a href="tel:+917982265845" className={styles.callBadge} title="Call 24/7 Corporate Travel Desk">
        <PhoneCall size={14} className={styles.callIcon} />
        <span>24/7 Desk: +91 79822 65845</span>
      </a>

      <a href="#contact" className={styles.quoteFab}>
        <Send size={15} />
        <span>Instant Quote</span>
      </a>
    </motion.div>
  );
}
