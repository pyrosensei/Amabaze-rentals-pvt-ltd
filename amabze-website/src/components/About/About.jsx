import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Check } from 'lucide-react';
import styles from './About.module.css';
import coachInterior from '../../assets/coach-interior.png';
import aboutCar from '../../assets/about-car.jpg';

const features = [
  'Pan-India service network',
  '300+ verified fleet',
  'Experienced chauffeurs',
  'GPS-tracked vehicles',
  'Statutory compliance',
  'Technology-enabled operations',
];

export default function About() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

  return (
    <motion.section
      ref={ref}
      id="about"
      className={styles.aboutSection}
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
            ABOUT AMABZE
          </motion.span>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Professional Mobility Built Around Your Time
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Amabze Rentals Pvt. Ltd. has built a strong reputation in the
            transportation industry by delivering reliable, professional,
            and customer-focused mobility solutions across India.
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.contentGrid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div className={styles.imageColumn}>
            <motion.div
              className={styles.imageWrapper}
              whileHover={{ scale: 1.01 }}
            >
              <img
                src={coachInterior}
                alt="Luxury coach interior with premium seating"
                loading="lazy"
                className={styles.image}
              />
            </motion.div>
            <motion.div
              className={styles.experienceBadge}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 15 }}
            >
              <span className={styles.badgeNumber}>300+</span>
              <span className={styles.badgeLabel}>Vehicles</span>
            </motion.div>
            <motion.div
              className={styles.secondaryImageCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <img
                src={aboutCar}
                alt="Chauffeur drills a corporate fleet car"
                loading="lazy"
                className={styles.secondaryImage}
              />
            </motion.div>
          </motion.div>

          <motion.div className={styles.contentColumn}>
            <motion.p
              className={styles.paragraph}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              We understand the value of time and the importance of dependable
              transportation. Our services support corporate organizations,
              multinational companies, public-sector bodies, business executives,
              and individual travelers.
            </motion.p>
            <motion.p
              className={styles.paragraph}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              With a fleet of 300+ GPS-tracked vehicles and professionally trained
              chauffeurs, we provide end-to-end mobility solutions across 30+
              cities in India — from daily corporate commutes to large-scale event
              logistics.
            </motion.p>

            <motion.div
              className={styles.featuresGrid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={styles.featureItem}
                  whileHover={{ x: 4 }}
                >
                  <motion.div
                    className={styles.featureIcon}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.05 * index }}
                  >
                    <Check size={16} />
                  </motion.div>
                  <span className={styles.featureText}>{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}