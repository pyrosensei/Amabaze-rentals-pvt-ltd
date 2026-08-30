import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Users, Briefcase, Info, ArrowRight } from 'lucide-react';
import styles from './Fleet.module.css';
import FleetModal from '../FleetModal/FleetModal';

import dzireImg from '../../assets/dzire.jpg';
import innovaImg from '../../assets/innova.jpg';
import touristBusImg from '../../assets/tourist-bus.jpg';
import coachImg from '../../assets/coach.jpg';

const Fleet = ({ onSelectVehicle }) => {
  const [activeTab, setActiveTab] = useState('All Vehicles');
  const [selectedItem, setSelectedItem] = useState(null);
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

  const allItems = [
    {
      id: 'sedans',
      image: dzireImg,
      name: 'Economy & Executive Sedans',
      category: 'Executive Fleet',
      tag: 'Popular for Executive Commute',
      vehicles: 'Dzire, Etios, Ciaz, Honda City',
      capacity: '4 Passengers',
      luggage: '2 Large Bags',
      description: 'Efficient city travel, corporate meetings, airport transfers, and business executive trips across India.',
      features: [
        'GPS Real-Time Telemetry',
        'Air Conditioned & Sanitized',
        'Professional Uniformed Chauffeur',
        'Airport Priority Flight Tracking',
        'Bottled Water & First Aid',
        'Statutory GST & Toll Billing Ready',
      ],
    },
    {
      id: 'suvs',
      image: innovaImg,
      name: 'Premium SUVs & MUVs',
      category: 'Premium Fleet',
      tag: 'VIP & Executive Travel',
      vehicles: 'Innova Crysta, Fortuner, Camry, Mercedes-Benz, BMW',
      capacity: '6-7 Passengers',
      luggage: '3 Large Bags',
      description: 'High-comfort executive travel, senior leadership movement, VIP delegation transfers, and corporate trips.',
      features: [
        'Captain Seat Reclining Comfort',
        'GPS & Emergency Panic Alert System',
        'Defensive-Driving Certified Chauffeur',
        'Spacious Luggage Capacity',
        'Pan-India Intercity Permit',
        '24/7 Travel Desk Monitoring',
      ],
    },
    {
      id: 'travellers',
      image: touristBusImg,
      name: 'Coaches, Buses & Travellers',
      category: 'Group Logistics',
      tag: 'Corporate Group Shuttles',
      vehicles: 'Tempo Traveller (12/16/26 Seater), Toyota Commuter, Volvo Bus',
      capacity: '12-45 Passengers',
      luggage: 'Dedicated Cargo Bay',
      description: 'Group business travel, daily employee commute routes, conference shuttles, and large event logistics.',
      features: [
        'Push-Back Reclining Seats',
        'PA Sound System & Overhead Rack',
        'Experienced Long-Distance Drivers',
        'Employee Commute Route Optimization',
        'Full Statutory PF/ESIC Compliance',
        'Dedicated On-Site Event Coordinator',
      ],
    },
    {
      id: 'coaches',
      image: coachImg,
      name: 'Luxury Long-Distance Coaches',
      category: 'Luxury Travel',
      tag: 'Long Distance & Events',
      vehicles: 'Volvo Multi-Axle, Scania Luxury Coach',
      capacity: '35-45 Passengers',
      luggage: 'Under-Floor Cargo Bay',
      description: 'Premium long-distance corporate travel, multi-city delegation tours, and large event transportation with reclining seats.',
      features: [
        'Pneumatic Air Suspension Ride',
        'On-Board Charging Outlets & Climate Control',
        'Multi-Axle Stability & Dual Drivers',
        'Intercity Express Corridor Certified',
        'Full Passenger Insurance Coverage',
        'Custom Branding Option for Events',
      ],
    },
  ];

  const fleetData = {
    'All Vehicles': allItems,
    'Executive Sedans': allItems.filter((i) => i.id === 'sedans'),
    'Premium SUVs & MUVs': allItems.filter((i) => i.id === 'suvs'),
    'Coaches & Travellers': allItems.filter((i) => i.id === 'travellers' || i.id === 'coaches'),
  };

  const tabs = ['All Vehicles', 'Executive Sedans', 'Premium SUVs & MUVs', 'Coaches & Travellers'];

  const handleBookClick = (item) => {
    if (onSelectVehicle) {
      onSelectVehicle(item);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.section
        ref={ref}
        id="fleet"
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
            <span className={styles.eyebrow}>
              <span>⚡</span> THE FLEET
            </span>
            <h2 className={styles.heading}>Precision-Maintained Vehicles for Every Requirement</h2>
            <p className={styles.subtitle}>
              From economical sedans to premium executive cars, tempo travellers, and luxury coaches — flexible transportation for any scale.
            </p>
          </motion.div>

          <div className={styles.tabsContainer}>
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <span>{tab}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className={styles.cardsGrid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {fleetData[activeTab].map((card) => (
                <motion.div
                  key={card.id}
                  className={styles.card}
                  whileHover={{ y: -6 }}
                >
                  <div className={styles.imageWrapper}>
                    <img src={card.image} alt={card.name} loading="lazy" className={styles.image} />
                    <span className={styles.vehicleTag}>{card.tag}</span>
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

                    <div className={styles.cardActions}>
                      <button
                        className={styles.btnInspect}
                        onClick={() => setSelectedItem(card)}
                        title="View detailed vehicle specifications"
                      >
                        <Info size={16} />
                        <span>Inspect Specs</span>
                      </button>
                      <button
                        className={styles.btnBook}
                        onClick={() => handleBookClick(card)}
                      >
                        <span>Book Vehicle</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Interactive Modal */}
      <FleetModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onBook={(item) => handleBookClick(item)}
      />
    </>
  );
};

export default Fleet;