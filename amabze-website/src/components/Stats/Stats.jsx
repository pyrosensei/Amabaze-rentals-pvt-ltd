import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Stats.module.css';

const statsData = [
  { value: '30+', label: 'Cities Across India' },
  { value: '300+', label: 'Verified Fleet' },
  { value: '24/7', label: 'Travel Support' },
  { value: '100%', label: 'Statutory Compliance' }
];

const Stats = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

  return (
    <motion.div
      ref={ref}
      className={styles.statsWrapper}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.container}>
        <motion.div
          className={styles.statsBanner}
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1), duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className={styles.statValue}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * (index + 1) + 0.1, type: 'spring', stiffness: 200, damping: 15 }}
              >
                {stat.value}
              </motion.div>
              <motion.div
                className={styles.statLabel}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) + 0.2, duration: 0.3 }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Stats;