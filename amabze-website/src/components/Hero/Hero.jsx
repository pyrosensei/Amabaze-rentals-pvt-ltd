import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import corporateSedan from '../../assets/corporate-sedan.jpg';

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Professional Chauffeur Services Built Around Your Schedule
          </motion.h1>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Pan-India employee transit, premium executive transfers, outstation travel, and coordinated event logistics — GPS-tracked and fully compliant.
          </motion.p>
          <motion.div
            className={styles.buttonGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.a
              href="#contact"
              className={styles.primaryButton}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Request a Quote
            </motion.a>
            <motion.a
              href="#fleet"
              className={styles.secondaryButton}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Our Fleet
            </motion.a>
          </motion.div>
        </motion.div>
        <motion.div
          className={styles.imageContent}
          initial={{ opacity: 0, x: 40, scale: 1.05 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.01 }}
        >
          <img 
            src={corporateSedan} 
            alt="Corporate sedan service" 
            className={styles.heroImage}
            fetchpriority="high"
          />
        </motion.div>
      </div>
      
      {/* Decorative floating elements */}
      <motion.div 
        className={styles.floatElement} 
        style={{ top: '10%', left: '5%', width: '120px', height: '120px' }}
        animate={{ 
          y: [0, -20, 0], 
          x: [0, 15, 0],
          rotate: [0, 5, 0]
        }} 
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className={styles.floatElement} 
        style={{ bottom: '15%', right: '8%', width: '80px', height: '80px' }}
        animate={{ 
          y: [0, 15, 0], 
          x: [0, -10, 0],
          rotate: [0, -3, 0]
        }} 
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className={styles.floatElement} 
        style={{ top: '40%', right: '15%', width: '60px', height: '60px' }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }} 
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </section>
  );
};

export default Hero;