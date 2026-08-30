import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Car, Globe, Headset, ShieldCheck, CheckCircle2 } from 'lucide-react';
import styles from './Stats.module.css';
import { EASE } from '../../lib/motion';

const statsData = [
  {
    icon: Globe,
    target: 100,
    prefix: '',
    suffix: '%',
    label: 'Pan-India Reach',
    subtext: 'Metros & Tier 1-2 Corridors',
  },
  {
    icon: Car,
    target: 300,
    prefix: '',
    suffix: '+',
    label: 'Verified Fleet',
    subtext: 'Sedans, SUVs & Coaches',
  },
  {
    icon: CheckCircle2,
    target: 99.4,
    prefix: '',
    suffix: '%',
    isDecimal: true,
    label: 'On-Time SLA',
    subtext: 'Enterprise Punctuality Rate',
  },
  {
    icon: Headset,
    target: 24,
    prefix: '',
    suffix: '/7',
    label: 'Command Dispatch',
    subtext: 'Centralized Operations Desk',
  },
  {
    icon: ShieldCheck,
    target: 100,
    prefix: '',
    suffix: '%',
    label: 'Statutory Compliant',
    subtext: 'PF, ESIC & GST Audited',
  },
];

function Counter({ target, suffix, prefix, isDecimal, delay, inView }) {
  const [display, setDisplay] = useState(isDecimal ? '0.0' : '0');

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, target, {
      type: 'spring',
      stiffness: 60,
      damping: 16,
      delay,
      onUpdate: (value) => {
        if (isDecimal) {
          setDisplay(value.toFixed(1));
        } else {
          setDisplay(Math.round(value).toString());
        }
      },
    });
    return () => controls.stop();
  }, [inView, target, delay, isDecimal]);

  return (
    <span className={styles.statValueNum}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

const Stats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <div ref={ref} className={styles.statsWrapper}>
      <div className={styles.container}>
        <motion.div
          className={styles.statsBanner}
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className={styles.statItem}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ delay: 0.08 * index, duration: 0.45, ease: EASE }}
              >
                <div className={styles.statIconBadge}>
                  <Icon size={18} />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>
                    <Counter
                      target={stat.target}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      isDecimal={stat.isDecimal}
                      inView={inView}
                      delay={0.15 + index * 0.08}
                    />
                  </div>
                  <div className={styles.statLabel}>{stat.label}</div>
                  <div className={styles.statSubtext}>{stat.subtext}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Stats;
