import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import styles from './Stats.module.css';
import { EASE } from '../../lib/motion';

const statsData = [
  { target: 30, suffix: '+', label: 'Cities Across India' },
  { target: 300, suffix: '+', label: 'Verified Fleet' },
  { target: 24, suffix: '/7', label: 'Travel Support' },
  { target: 100, suffix: '%', label: 'Statutory Compliance' },
];

function Counter({ target, suffix, delay, inView }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, target, {
      type: 'spring',
      stiffness: 70,
      damping: 18,
      delay,
      onUpdate: (value) => setDisplay(Math.round(value)),
    });
    return () => controls.stop();
  }, [inView, target, delay]);

  return (
    <span className={styles.statValueNum}>
      {display}
      {suffix}
    </span>
  );
}

const Stats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });

  return (
    <motion.div
      ref={ref}
      className={styles.statsWrapper}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: EASE }}
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
              key={stat.label}
              className={styles.statItem}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1), duration: 0.45, ease: EASE }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className={styles.statValue}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * (index + 1) + 0.1, type: 'spring', stiffness: 200, damping: 15 }}
              >
                <Counter target={stat.target} suffix={stat.suffix} inView={inView} delay={0.2 + index * 0.15} />
              </motion.div>
              <motion.div
                className={styles.statLabel}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) + 0.25, duration: 0.3, ease: EASE }}
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