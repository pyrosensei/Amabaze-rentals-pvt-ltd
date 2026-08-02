import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { MapPin } from 'lucide-react';
import styles from './Presence.module.css';

const Presence = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

  const cities = [
    'Delhi', 'Gurugram', 'Noida', 'Mumbai', 'Bengaluru', 'Hyderabad', 
    'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Chandigarh', 
    'Lucknow', 'Jaipur', 'Patna', 'Ranchi'
  ];

  return (
    <motion.section
      ref={ref}
      className={styles.presenceSection}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          >
            PAN-INDIA PRESENCE
          </motion.span>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Wherever Business Takes You
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Our services are available across 30+ cities in India with a growing network of professional transportation solutions.
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.citiesContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, staggerChildren: 0.05 }}
        >
          {cities.map((city, index) => (
            <motion.div
              key={index}
              className={styles.cityPill}
              whileHover={{ scale: 1.1, y: -3, boxShadow: 'var(--shadow-lg)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.05 * index }}
            >
              <MapPin size={14} className={styles.pinIcon} />
              <span>{city}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating map pin decorative elements */}
        <motion.div
          className={styles.floatPin}
          style={{ top: '15%', left: '3%' }}
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MapPin size={28} style={{ color: 'var(--color-brand-600)', opacity: 0.3 }} />
        </motion.div>
        <motion.div
          className={styles.floatPin}
          style={{ bottom: '20%', right: '5%' }}
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <MapPin size={24} style={{ color: 'var(--color-accent-400)', opacity: 0.3 }} />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Presence;