import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Route, ShieldCheck, MapPin } from 'lucide-react';
import styles from './Hero.module.css';
import heroCar from '../../assets/hero-car.jpg';

const cities = [
  'Delhi', 'Gurugram', 'Noida', 'Faridabad', 'Ghaziabad', 'Chandigarh', 'Jaipur',
  'Agra', 'Lucknow', 'Dehradun', 'Rishikesh', 'Haridwar', 'Amritsar', 'Shimla',
  'Manali', 'Jodhpur', 'Udaipur', 'Ahmedabad', 'Mumbai', 'Pune', 'Bengaluru',
  'Chennai', 'Hyderabad', 'Kolkata',
];

const FrameStroke = () => (
  <svg className={styles.frameStroke} viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
    <rect x="2" y="2" width="396" height="296" rx="22" fill="none" />
  </svg>
);

const RouteOverlay = ({ animate }) => (
  <svg className={styles.routeOverlay} viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
    <path className={styles.routePath} d="M 30 240 C 120 200, 180 270, 270 210 S 350 90, 380 60" />
    {animate && (
      <circle className={styles.routeDot} r="6" fill="currentColor">
        <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path="M 30 240 C 120 200, 180 270, 270 210 S 350 90, 380 60" />
      </circle>
    )}
  </svg>
);

const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            CORPORATE MOBILITY SOLUTIONS
          </motion.span>

          <motion.h1
            className={styles.heading}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Professional Chauffeur Services Built Around{' '}
            <motion.span className={styles.accentWord}>Your Schedule</motion.span>
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Pan-India employee transit, premium executive transfers, outstation travel, and
            coordinated event logistics — GPS-tracked and fully compliant.
          </motion.p>

          <motion.div
            className={styles.buttonGroup}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.a
              href="#contact"
              className={styles.primaryButton}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Request a Quote
            </motion.a>
            <motion.a
              href="#fleet"
              className={styles.secondaryButton}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              View Our Fleet
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.imageContent}
          initial={{ opacity: 0, x: 40, scale: 1.04 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className={styles.imageFrame}>
            <img
              src={heroCar}
              alt="Premium corporate fleet vehicle on a highway"
              className={styles.heroImage}
              fetchPriority="high"
            />
            <FrameStroke />
            <RouteOverlay animate={!reduceMotion} />
          </div>

          <motion.div
            className={`${styles.statChip} ${styles.statChipOne}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className={styles.statChipIcon}>
              <Route size={15} />
            </span>
            <span className={styles.statChipText}>
              <strong>GPS-tracked</strong>
              <em>24×7 control room</em>
            </span>
          </motion.div>

          <motion.div
            className={`${styles.statChip} ${styles.statChipTwo}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.95, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className={styles.statChipIcon}>
              <ShieldCheck size={15} />
            </span>
            <span className={styles.statChipText}>
              <strong>300+ verified</strong>
              <em>fleet across 30+ cities</em>
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...cities, ...cities].map((city, index) => (
            <span className={styles.marqueeItem} key={index}>
              <MapPin size={13} />
              {city}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;