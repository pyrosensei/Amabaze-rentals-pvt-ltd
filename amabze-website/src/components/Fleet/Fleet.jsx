import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Users, Briefcase } from 'lucide-react';
import styles from './Fleet.module.css';

import dzireImg from '../../assets/dzire.jpg';
import innovaImg from '../../assets/innova.jpg';
import touristBusImg from '../../assets/tourist-bus.jpg';
import coachImg from '../../assets/coach.jpg';

const Fleet = () => {
  const [activeTab, setActiveTab] = useState('Executive Sedans');
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

  const fleetData = {
    'Executive Sedans': [
      { image: dzireImg, name: 'Economy & Executive Sedans', vehicles: 'Dzire, Etios, Ciaz, Honda City', capacity: '4 Passengers', luggage: '2 Large Bags', description: 'Efficient city travel, airport transfers, and business trips.' }
    ],
    'Premium SUVs & MUVs': [
      { image: innovaImg, name: 'Premium SUVs & MUVs', vehicles: 'Innova Crysta, Fortuner, Corolla, Camry, Mercedes-Benz, BMW', capacity: '6-7 Passengers', luggage: '3 Large Bags', description: 'Executive travel, VIP transfers, and corporate mobility.' }
    ],
    'Coaches & Travellers': [
      { image: touristBusImg, name: 'Coaches, Buses & Travellers', vehicles: 'Tempo Traveller, Toyota Commuter, HiAce, Volvo Bus', capacity: '12-45 Passengers', luggage: 'Cargo Bay', description: 'Group travel, corporate shuttles, events, and large-scale logistics.' },
      { image: coachImg, name: 'Luxury Long-Distance Coaches', vehicles: 'Volvo Multi-Axle, Scania', capacity: '35-45 Passengers', luggage: 'Full Cargo Bay', description: 'Premium long-distance travel with reclining seats and onboard amenities.' }
    ]
  };

  const tabs = ['Executive Sedans', 'Premium SUVs & MUVs', 'Coaches & Travellers'];

  return (
    <motion.section
      ref={ref}
      className={styles.fleetSection}
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
            THE FLEET
          </motion.span>
          <motion.h2
            className={styles.heading}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Precision-Maintained Vehicles for Every Requirement
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            From economical sedans to premium executive cars, tempo travellers, and luxury coaches — flexible transportation for any scale.
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.tabsContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab}
              className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * (index + 1), duration: 0.3 }}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className={styles.cardsGrid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {fleetData[activeTab].map((card, index) => (
              <motion.div
                key={index}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, boxShadow: 'var(--shadow-xl)' }}
              >
                <div className={styles.imageWrapper}>
                  <img src={card.image} alt={card.name} loading="lazy" className={styles.image} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardName}>{card.name}</h3>
                  <p className={styles.vehicles}>{card.vehicles}</p>
                  <div className={styles.specs}>
                    <div className={styles.specItem}>
                      <Users className={styles.specIcon} />
                      <span>{card.capacity}</span>
                    </div>
                    <div className={styles.specItem}>
                      <Briefcase className={styles.specIcon} />
                      <span>{card.luggage}</span>
                    </div>
                  </div>
                  <p className={styles.description}>{card.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Fleet;