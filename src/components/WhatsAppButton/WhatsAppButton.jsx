import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton({ customText }) {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '917982265845'; // Amabze Corporate Desk
  const defaultMsg =
    customText ||
    'Hello Amabze Rentals, I would like to inquire about corporate car rental / fleet booking.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <div className={styles.floatingContainer}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.floatBtn} ${isHovered ? styles.expanded : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        title="Share on WhatsApp (Amabze 24/7 Desk)"
        aria-label="Share on WhatsApp"
      >
        <div className={styles.iconWrapper}>
          <MessageCircle size={20} className={styles.waIcon} />
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              className={styles.labelWrapper}
              initial={{ opacity: 0, width: 0, x: -8 }}
              animate={{ opacity: 1, width: 'auto', x: 0 }}
              exit={{ opacity: 0, width: 0, x: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.waLabel}>Share on WhatsApp</span>
            </motion.div>
          )}
        </AnimatePresence>
      </a>
    </div>
  );
}
