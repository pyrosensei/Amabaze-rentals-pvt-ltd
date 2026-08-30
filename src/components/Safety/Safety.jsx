import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ShieldCheck, MapPin, HeartPulse, FileCheck, Clock, Award } from 'lucide-react';
import styles from './Safety.module.css';

const Safety = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

  const safetyItems = [
    {
      icon: ShieldCheck,
      title: 'Verified Professional Chauffeurs',
      description: 'Background-verified drivers trained in defensive driving, courteous conduct, and city navigation.'
    },
    {
      icon: MapPin,
      title: 'GPS-Enabled Real-Time Tracking',
      description: 'All vehicles equipped with GPS telemetry for live tracking, route monitoring, and panic alert systems.'
    },
    {
      icon: HeartPulse,
      title: 'Emergency Preparedness',
      description: 'Vehicles carry first-aid kits and fire extinguishers. Chauffeurs trained in emergency response protocols.'
    }
  ];

  const complianceItems = [
    {
      icon: FileCheck,
      title: 'Statutory Compliance',
      description: 'Fully compliant with PF, ESIC, commercial vehicle insurance, and all applicable regulatory standards.'
    },
    {
      icon: Clock,
      title: '24/7 Travel Desk Support',
      description: 'Round-the-clock coordination center in Gurugram for real-time assistance and trip management.'
    },
    {
      icon: Award,
      title: 'Service Quality Assurance',
      description: 'Regular vehicle audits, chauffeur performance evaluations, and client feedback integration.'
    }
  ];

  return (
    <motion.section
      ref={ref}
      id="safety"
      className={styles.safetySection}
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
            SAFETY & COMPLIANCE
          </motion.span>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Statutory Compliance & Passenger Safety
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Professional standards, verified chauffeurs, and technology-enabled operations supporting every journey.
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.contentGrid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div className={styles.column}>
            {safetyItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className={styles.item}
                  whileHover={{ x: 8 }}
                >
                  <motion.div
                    className={styles.iconWrapper}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 * (index + 1) }}
                  >
                    <Icon className={styles.icon} />
                  </motion.div>
                  <motion.div
                    className={styles.textContent}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (index + 1) + 0.1, duration: 0.4 }}
                  >
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemDescription}>{item.description}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
          <motion.div className={styles.column}>
            {complianceItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className={styles.item}
                  whileHover={{ x: 8 }}
                >
                  <motion.div
                    className={styles.iconWrapper}
                    initial={{ scale: 0, rotate: 90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 * (index + 1) + 0.15 }}
                  >
                    <Icon className={styles.icon} />
                  </motion.div>
                  <motion.div
                    className={styles.textContent}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (index + 1) + 0.25, duration: 0.4 }}
                  >
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemDescription}>{item.description}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Standard In-Cabin Executive Amenities (Company Profile Page 5) */}
        <motion.div
          className={styles.amenitiesCard}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <div className={styles.amenitiesHeader}>
            <span className={styles.amenitiesBadge}>STANDARD FLEET SPECIFICATION</span>
            <h3 className={styles.amenitiesTitle}>Every Amabze Vehicle Comes Equipped With:</h3>
          </div>
          <div className={styles.amenitiesGrid}>
            {[
              'Real-Time GPS with In-Cabin SOS Panic Button',
              'First Aid Medical Kit & Emergency Hammer',
              'Certified Commercial Fire Extinguisher',
              'High-Speed Mobile Fast Chargers (All Ports)',
              'Daily Business Newspapers & Magazines',
              'Full-Size Executive Travel Umbrella',
              'Premium In-Cabin Air Freshener & Tissue Box',
              'Speed Governor & Automated Route Tracking',
            ].map((amenity, idx) => (
              <div key={idx} className={styles.amenityItem}>
                <span className={styles.amenityCheck}>✓</span>
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Safety;