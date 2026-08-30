import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall } from 'lucide-react';
import styles from './FloatingCTA.module.css';

export default function FloatingCTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={styles.floatingContainer}
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
    >
      <a
        href="tel:01244974856"
        className={`${styles.phonePill} ${isHovered ? styles.expanded : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        title="Amabze Operations Desk: 0124 4974856 / +91 79822 65845"
        aria-label="Call Amabze Operations Desk"
      >
        <div className={styles.iconCircle}>
          <PhoneCall size={18} className={styles.phoneIcon} />
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              className={styles.phoneLabelWrap}
              initial={{ opacity: 0, width: 0, x: 8 }}
              animate={{ opacity: 1, width: 'auto', x: 0 }}
              exit={{ opacity: 0, width: 0, x: 8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.phoneLabel}>0124 4974856</span>
            </motion.div>
          )}
        </AnimatePresence>
      </a>
    </motion.div>
  );
}
