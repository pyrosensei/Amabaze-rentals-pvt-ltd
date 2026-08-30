import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Users, Briefcase, Info, ArrowRight, ShieldCheck, Sparkles, Check } from 'lucide-react';
import styles from './Fleet.module.css';
import FleetModal from '../FleetModal/FleetModal';

import dzireImg from '../../assets/dzire.jpg';
import innovaImg from '../../assets/innova.jpg';
import touristBusImg from '../../assets/images/executive_urbania_bus_1788075709816.jpg';
import coachImg from '../../assets/images/coach_luxury_bus_1788075692477.jpg';

const Fleet = ({ onSelectVehicle }) => {
  const [activeTab, setActiveTab] = useState('All Vehicles');
  const [selectedItem, setSelectedItem] = useState(null);
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  const allItems = [
    {
      id: 'sedans',
      image: dzireImg,
      name: 'Executive & Business Sedans',
      category: 'Executive Fleet',
      tag: 'Daily Transit & Airport',
      vehicles: 'Maruti Dzire, Toyota Etios, Honda City, Maruti Ciaz',
      capacity: '4 Passengers',
      luggage: '2 Standard Bags',
      description: 'Ideal for executive commutes, airport transfers, client delegations, and intra-city business meetings.',
      features: [
        'Live GPS Telematics & Geo-fencing',
        'Defensive Driving Certified Chauffeur',
        'Air Conditioned & Daily Sanitized',
        'Complimentary Bottled Water & Umbrella',
        'Flight Tracking for Airport Pickups',
        'Automated GST & Toll Consolidated Invoicing',
      ],
      quickBadges: ['GPS Live', 'AC Cleaned', 'Chauffeur in Uniform', 'GST Invoice'],
    },
    {
      id: 'suvs',
      image: innovaImg,
      name: 'Premium SUVs & MUVs',
      category: 'Premium Fleet',
      tag: 'VIP & Senior Leadership',
      vehicles: 'Toyota Innova Crysta, Hycross, Fortuner, Camry',
      capacity: '6–7 Passengers',
      luggage: '4 Large Bags',
      description: 'Spacious high-comfort transportation for senior corporate management, board delegations, and outstation transit.',
      features: [
        'Captain Seat Reclining Ergonomics',
        'SOS Emergency Panic & Telemetry Module',
        'Senior Chauffeur with Route Expertise',
        'Expansive Luggage Boot Space',
        'Pan-India Intercity Commercial Permits',
        '24×7 Operations Control Desk Support',
      ],
      quickBadges: ['Captain Seats', 'Intercity Ready', 'Senior Driver', 'All-India Permit'],
    },
    {
      id: 'travellers',
      image: touristBusImg,
      name: 'Executive Travellers & Mini-Buses',
      category: 'Group Logistics',
      tag: 'Staff Commute & Teams',
      vehicles: 'Force Urbania, Tempo Traveller (12/17/26 Seater), Toyota Coaster',
      capacity: '12–26 Passengers',
      luggage: 'Dedicated Cargo Bay',
      description: 'Designed for daily corporate employee shuttles, department team offsites, and airport group transfers.',
      features: [
        'Individual High-Back Reclining Seats',
        'Dual AC & USB Fast-Charging Ports',
        'Employee Commute Route Optimization',
        '100% Statutory PF/ESIC Driver Compliance',
        'PA Announcement System & First Aid Kit',
        'Speed Governor & GPS Route Audits',
      ],
      quickBadges: ['12-26 Seats', 'Staff Commute', 'USB Charging', 'Route Optimized'],
    },
    {
      id: 'coaches',
      image: coachImg,
      name: 'Luxury Volvo & Long-Distance Coaches',
      category: 'Luxury Travel',
      tag: 'Conferences & Large Logistics',
      vehicles: 'Volvo 9400 / 9600 Multi-Axle, Scania Metrolink (35–45 Seater)',
      capacity: '35–45 Passengers',
      luggage: 'Underfloor Luggage Hold',
      description: 'Large-scale group movements for annual general meetings, corporate retreats, and multi-day summits.',
      features: [
        'Pneumatic Electronically Controlled Air Suspension',
        'Individual Reading Lights & Climate Louvers',
        'Multi-Axle Highway Stability with Dual Chauffeurs',
        'Underfloor High-Capacity Luggage Holds',
        'Complete Comprehensive Passenger Insurance',
        'Custom Fleet Corporate Branding Options',
      ],
      quickBadges: ['Air Suspension', 'Dual Chauffeur', 'High Capacity', 'Event Coordinated'],
    },
  ];

  const fleetData = {
    'All Vehicles': allItems,
    'Executive Sedans': allItems.filter((i) => i.id === 'sedans'),
    'Premium SUVs': allItems.filter((i) => i.id === 'suvs'),
    'Travellers & Coaches': allItems.filter((i) => i.id === 'travellers' || i.id === 'coaches'),
  };

  const tabs = ['All Vehicles', 'Executive Sedans', 'Premium SUVs', 'Travellers & Coaches'];

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
      <section ref={ref} id="fleet" className={styles.fleetSection}>
        <div className={styles.container}>
          {/* Section Header */}
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.eyebrow}>
              <ShieldCheck size={14} />
              <span>COMMERCIAL FLEET INVENTORY</span>
            </div>
            <h2 className={styles.heading}>Precision-Maintained Fleet for Every Requirement</h2>
            <p className={styles.subtitle}>
              From verified daily executive sedans to luxury Volvo multi-axle coaches — deploy reliable,
              statutorily compliant transportation at scale across India.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div className={styles.tabsContainer}>
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <span>{tab}</span>
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className={styles.cardsGrid}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {fleetData[activeTab].map((card) => (
                <div key={card.id} className={styles.fleetCard}>
                  {/* Image Container */}
                  <div className={styles.imageContainer}>
                    <img src={card.image} alt={card.name} loading="lazy" className={styles.cardImage} />
                    <span className={styles.categoryBadge}>{card.tag}</span>
                  </div>

                  {/* Card Content */}
                  <div className={styles.cardBody}>
                    <div className={styles.cardEyebrow}>{card.category}</div>
                    <h3 className={styles.cardTitle}>{card.name}</h3>
                    <p className={styles.modelsText}>{card.vehicles}</p>

                    {/* Specs Row */}
                    <div className={styles.specsRow}>
                      <div className={styles.specChip}>
                        <Users size={15} className={styles.specIcon} />
                        <span>{card.capacity}</span>
                      </div>
                      <div className={styles.specChip}>
                        <Briefcase size={15} className={styles.specIcon} />
                        <span>{card.luggage}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={styles.cardDescription}>{card.description}</p>

                    {/* Quick Badges */}
                    <div className={styles.badgesList}>
                      {card.quickBadges.map((badge, bIdx) => (
                        <span key={bIdx} className={styles.badgeItem}>
                          <Check size={13} className={styles.badgeCheckIcon} />
                          <span>{badge}</span>
                        </span>
                      ))}
                    </div>

                    {/* Card Actions */}
                    <div className={styles.actionsRow}>
                      <button
                        type="button"
                        className={styles.btnSecondary}
                        onClick={() => setSelectedItem(card)}
                        title="View detailed vehicle specifications"
                      >
                        <Info size={15} />
                        <span>Full Specs</span>
                      </button>
                      <button
                        type="button"
                        className={styles.btnPrimary}
                        onClick={() => handleBookClick(card)}
                      >
                        <span>Reserve Vehicle</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Corporate Proposal Callout */}
          <div className={styles.tariffBanner}>
            <div className={styles.tariffInfo}>
              <div className={styles.tariffIconBox}>
                <Sparkles size={20} />
              </div>
              <div className={styles.tariffText}>
                <strong>Need a customized enterprise mobility proposal?</strong>
                <p>Consult with our corporate travel desk for tailored vehicle deployment, route optimization, and long-term fleet contracts.</p>
              </div>
            </div>
            <a href="#contact" className={styles.tariffBtn}>
              <span>Request Custom Proposal</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

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
