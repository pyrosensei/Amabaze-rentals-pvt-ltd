import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { MapPin, Search, Plane, PhoneCall } from 'lucide-react';
import styles from './Presence.module.css';

const Presence = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -100px 0px' });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRegion, setActiveRegion] = useState('All');

  const hubs = [
    { city: 'Delhi NCR', region: 'North', airport: 'IGI Airport T3 / T2', desk: '24/7 Control Room' },
    { city: 'Gurugram', region: 'North', airport: 'HQ Hub • Sector 29', desk: 'Headquarters' },
    { city: 'Noida', region: 'North', airport: 'Greater Noida Corridor', desk: '24/7 Dispatch' },
    { city: 'Mumbai', region: 'West', airport: 'BOM Chhatrapati Shivaji T2', desk: 'Western Hub' },
    { city: 'Bengaluru', region: 'South', airport: 'BLR Kempegowda T2', desk: 'Southern Hub' },
    { city: 'Hyderabad', region: 'South', airport: 'HYD Rajiv Gandhi Int.', desk: 'Telangana Hub' },
    { city: 'Chennai', region: 'South', airport: 'MAA Chennai International', desk: 'Tamil Nadu Hub' },
    { city: 'Kolkata', region: 'East', airport: 'CCU Netaji Subhash Chandra', desk: 'Eastern Hub' },
    { city: 'Pune', region: 'West', airport: 'PNQ Pune Airport', desk: 'Maharashtra Desk' },
    { city: 'Ahmedabad', region: 'West', airport: 'AMD Sardar Vallabhbhai', desk: 'Gujarat Desk' },
    { city: 'Chandigarh', region: 'North', airport: 'IXC Chandigarh Int.', desk: 'Punjab & Haryana' },
    { city: 'Lucknow', region: 'North', airport: 'LKO Chaudhary Charan Singh', desk: 'UP Central Hub' },
    { city: 'Jaipur', region: 'North', airport: 'JAI Jaipur International', desk: 'Rajasthan Hub' },
    { city: 'Patna', region: 'East', airport: 'PAT Jayprakash Narayan', desk: 'Bihar Operations' },
    { city: 'Ranchi', region: 'East', airport: 'IXR Birsa Munda Airport', desk: 'Jharkhand Hub' },
  ];

  const regions = ['All', 'North', 'West', 'South', 'East'];

  const filteredHubs = hubs.filter((hub) => {
    const matchesSearch = hub.city.toLowerCase().includes(searchTerm.toLowerCase()) || hub.airport.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = activeRegion === 'All' || hub.region === activeRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <motion.section
      ref={ref}
      id="presence"
      className={styles.presenceSection}
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
            <MapPin size={14} /> PAN-INDIA PRESENCE
          </span>
          <h2 className={styles.heading}>Wherever Business Takes You Across India</h2>
          <p className={styles.subtitle}>
            Active operations and 24/7 travel desk support in 30+ major industrial and metro cities across India.
          </p>
        </motion.div>

        {/* Controls Bar: Real-time search & Region Filter */}
        <div className={styles.controlsBar}>
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search your city or airport... e.g. Gurugram, Mumbai, IGI"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.regionTabs}>
            {regions.map((reg) => (
              <button
                key={reg}
                className={`${styles.regionButton} ${activeRegion === reg ? styles.active : ''}`}
                onClick={() => setActiveRegion(reg)}
              >
                {reg === 'All' ? 'All Hubs' : `${reg} Region`}
              </button>
            ))}
          </div>
        </div>

        {/* Hub Cards Grid */}
        <div className={styles.citiesGrid}>
          <AnimatePresence mode="popLayout">
            {filteredHubs.length > 0 ? (
              filteredHubs.map((hub) => (
                <motion.div
                  key={hub.city}
                  layout
                  className={styles.cityCard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className={styles.cardHeader}>
                    <span className={styles.cityName}>{hub.city}</span>
                    <span className={styles.statusDot} title="24/7 Active Fleet Hub" />
                  </div>
                  <div className={styles.airportInfo}>
                    <Plane size={13} />
                    <span>{hub.airport}</span>
                  </div>
                  <div className={styles.hubFooter}>
                    <PhoneCall size={12} />
                    <span>{hub.desk}</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className={styles.emptyState}>
                No matching city hub found for "{searchTerm}". Our pan-India network covers 30+ additional cities upon request.
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Ambient Map Pins */}
        <motion.div
          className={styles.floatPin}
          style={{ top: '15%', left: '3%' }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MapPin size={28} style={{ color: 'var(--color-brand-600)', opacity: 0.25 }} />
        </motion.div>
        <motion.div
          className={styles.floatPin}
          style={{ bottom: '15%', right: '4%' }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <MapPin size={24} style={{ color: 'var(--color-brand-300)', opacity: 0.25 }} />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Presence;