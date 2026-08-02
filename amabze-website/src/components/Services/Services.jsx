import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { 
  Car, 
  Users, 
  Plane, 
  Route, 
  Calendar, 
  PartyPopper,
  ArrowRight
} from 'lucide-react';
import styles from './Services.module.css';

const servicesData = [
  {
    icon: Car,
    title: 'Spot Rentals',
    description: 'Flexible local rentals for business travel, client meetings, executive tasks, and personal requirements.'
  },
  {
    icon: Users,
    title: 'Employee Transport',
    description: 'Safe, GPS-tracked daily commute routing with compliance-ready documentation for corporate organizations.'
  },
  {
    icon: Plane,
    title: 'Airport Transfers',
    description: 'Reliable, on-time pickup and drop-off services across all major airports in India.'
  },
  {
    icon: Route,
    title: 'Outstation Trips',
    description: 'Comfortable chauffeur-driven intercity and long-distance travel with experienced drivers.'
  },
  {
    icon: Calendar,
    title: 'Monthly Rentals',
    description: 'Cost-effective long-term vehicle leasing solutions for organizations and individuals.'
  },
  {
    icon: PartyPopper,
    title: 'Event Logistics',
    description: 'Complete guest transportation coordination — shuttles, VIP transfers, and venue logistics.'
  }
];

const Services = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

  return (
    <motion.section
      ref={ref}
      className={styles.servicesSection}
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
            SERVICES
          </motion.span>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Enterprise Mobility Designed for Reliability
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            From daily corporate commutes to large-scale event logistics, our services are built around safety, punctuality, and professional excellence.
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
        >
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className={styles.card}
                whileHover={{ y: -8, boxShadow: 'var(--shadow-xl)', borderColor: 'var(--color-brand-300)' }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className={styles.iconWrapper}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 * (index + 1) }}
                >
                  <Icon size={24} className={styles.icon} />
                </motion.div>
                <motion.h3
                  className={styles.cardTitle}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1) + 0.1, duration: 0.3 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  className={styles.cardDescription}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1) + 0.15, duration: 0.3 }}
                >
                  {service.description}
                </motion.p>
                <motion.div
                  className={styles.cardLink}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * (index + 1) + 0.2, duration: 0.3 }}
                  whileHover={{ x: 4 }}
                >
                  <span>Learn more</span>
                  <ArrowRight size={16} className={styles.linkIcon} />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Services;