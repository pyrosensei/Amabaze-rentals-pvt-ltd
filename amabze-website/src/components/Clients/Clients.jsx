import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Clients.module.css';

const clientsList = [
  { name: 'Samsung', color: '#1428A0' },
  { name: 'Michael Page', color: '#000000' },
  { name: 'DLF', color: '#E31837' },
  { name: 'Ireo', color: '#0056A0' },
  { name: 'PITSTOP', color: '#FF6B00' },
  { name: 'Wizcraft', color: '#8B0000' },
  { name: 'ATA', color: '#003366' },
  { name: 'Ford Mobility India', color: '#003399' },
  { name: 'Experion Care', color: '#007B83' },
  { name: 'D.J. Corporation & Investment', color: '#1A1A2E' }
];

const Clients = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

  return (
    <motion.section
      ref={ref}
      className={styles.clientsSection}
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
            TRUSTED BY
          </motion.span>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Partnered with Industry Leaders
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            We are proud to deliver dependable transportation services to leading organizations across India.
          </motion.p>
        </motion.div>

        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {/* First set of clients */}
            {clientsList.map((client, index) => (
              <motion.div
                key={`first-${index}`}
                className={styles.clientCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index, duration: 0.4 }}
              >
                <div
                  className={styles.clientLogo}
                  style={{ backgroundColor: client.color }}
                >
                  {client.name}
                </div>
              </motion.div>
            ))}
            {/* Duplicate set for infinite scroll */}
            {clientsList.map((client, index) => (
              <motion.div
                key={`second-${index}`}
                className={styles.clientCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index, duration: 0.4 }}
              >
                <div
                  className={styles.clientLogo}
                  style={{ backgroundColor: client.color }}
                >
                  {client.name}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gradient fade edges */}
          <div className={styles.fadeLeft} />
          <div className={styles.fadeRight} />
        </div>
      </div>
    </motion.section>
  );
};

export default Clients;