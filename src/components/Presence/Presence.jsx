import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Globe, ShieldCheck, MapPin, Plane, Radio, CheckCircle, ArrowRight, Building2 } from 'lucide-react';
import styles from './Presence.module.css';

const operationalZones = [
  {
    id: 'north',
    region: 'North India Command',
    keyCenters: 'Delhi NCR, Gurugram, Noida, Chandigarh, Jaipur, Lucknow, Dehradun',
    dispatchHub: 'Primary Operations Command & 24/7 Control Room',
    airports: 'DEL (T1/T2/T3), IXC, JAI, LKO',
    fleetDeployed: '120+ Sedans, SUVs & Coaches',
  },
  {
    id: 'west',
    region: 'West India Command',
    keyCenters: 'Mumbai, Pune, Ahmedabad, Vadodara, Surat, Nashik, Goa',
    dispatchHub: 'Western Regional Dispatch & Corporate Fleet Desk',
    airports: 'BOM (T1/T2), PNQ, AMD, GOI/GOX',
    fleetDeployed: '80+ Executive & Luxury Vehicles',
  },
  {
    id: 'south',
    region: 'South India Command',
    keyCenters: 'Bengaluru, Hyderabad, Chennai, Kochi, Coimbatore, Mysuru',
    dispatchHub: 'Southern Tech-Corridor & IT Park Mobility Center',
    airports: 'BLR (T1/T2), HYD, MAA, COK',
    fleetDeployed: '75+ Corporate Commute & Executive Sedans',
  },
  {
    id: 'east',
    region: 'East & Central India Command',
    keyCenters: 'Kolkata, Bhubaneswar, Patna, Ranchi, Raipur, Guwahati',
    dispatchHub: 'Eastern & Industrial Corridor Logistics Desk',
    airports: 'CCU, BBI, PAT, IXR',
    fleetDeployed: '45+ Verified Commercial Vehicles',
  },
];

const coveragePillars = [
  {
    icon: Globe,
    title: 'All-India Commercial Permits',
    desc: 'Zero inter-state checkpoint delays with all-India tourist vehicle authorisations and automated state border tax compliance.',
  },
  {
    icon: Radio,
    title: 'Centralized 24/7 Telematics Desk',
    desc: 'Continuous real-time satellite tracking, geo-fencing, and emergency alert integration monitored from our central control room.',
  },
  {
    icon: Building2,
    title: 'Unified Corporate Invoicing',
    desc: 'Whether your executives travel in Delhi, Mumbai, or Bengaluru, receive a single consolidated monthly GST tax invoice.',
  },
  {
    icon: Plane,
    title: 'Executive Airport Concierge',
    desc: 'Standardized flight tracking, uniformed chauffeur nameboard meet & greet, and priority parking protocols nationwide.',
  },
];

const Presence = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  const [activeZone, setActiveZone] = useState('north');

  const selectedZoneData = operationalZones.find((z) => z.id === activeZone) || operationalZones[0];

  return (
    <section ref={ref} id="presence" className={styles.presenceSection}>
      <div className={styles.ambientGrid} aria-hidden="true" />

      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.eyebrow}>
            <Globe size={14} />
            <span>NATIONWIDE MOBILITY INFRASTRUCTURE</span>
          </div>
          <h2 className={styles.heading}>Pan-India Operations & Unified Fleet Command</h2>
          <p className={styles.subtitle}>
            From major metropolitan headquarters and technology corridors to remote industrial complexes
            and airports nationwide, Amabze delivers consistent enterprise SLAs across India.
          </p>
        </motion.div>

        {/* Interactive Zone Command Center */}
        <div className={styles.commandGrid}>
          {/* Left: Zone Selection List */}
          <div className={styles.zoneList}>
            <div className={styles.zoneListHeader}>
              <span>REGIONAL OPERATING HUBS</span>
              <span className={styles.liveIndicator}>
                <span className={styles.livePulse} />
                LIVE NETWORK
              </span>
            </div>

            {operationalZones.map((zone) => {
              const isSelected = activeZone === zone.id;
              return (
                <button
                  key={zone.id}
                  className={`${styles.zoneButton} ${isSelected ? styles.zoneButtonActive : ''}`}
                  onClick={() => setActiveZone(zone.id)}
                >
                  <div className={styles.zoneBtnLeft}>
                    <MapPin size={16} className={styles.zonePinIcon} />
                    <div className={styles.zoneBtnInfo}>
                      <span className={styles.zoneBtnTitle}>{zone.region}</span>
                      <span className={styles.zoneBtnSub}>{zone.keyCenters.split(',').slice(0, 3).join(', ')}...</span>
                    </div>
                  </div>
                  <span className={styles.zoneBadge}>{zone.fleetDeployed.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Active Zone Details Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedZoneData.id}
              className={styles.zoneDetailCard}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.zoneCardHeader}>
                <div>
                  <div className={styles.cardEyebrow}>REGIONAL HEADQUARTERS</div>
                  <h3 className={styles.cardRegionTitle}>{selectedZoneData.region}</h3>
                </div>
                <div className={styles.cardStatusPill}>
                  <ShieldCheck size={14} />
                  <span>24×7 Active SLA</span>
                </div>
              </div>

              <div className={styles.detailRows}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Key Coverage Centers:</span>
                  <span className={styles.detailValue}>{selectedZoneData.keyCenters}</span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Airport Operations:</span>
                  <span className={styles.detailValueHighlight}>{selectedZoneData.airports}</span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Dispatch Command Desk:</span>
                  <span className={styles.detailValue}>{selectedZoneData.dispatchHub}</span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Commercial Fleet Strength:</span>
                  <span className={styles.detailValueFleet}>{selectedZoneData.fleetDeployed}</span>
                </div>
              </div>

              <div className={styles.zoneCardFooter}>
                <div className={styles.footerNote}>
                  <CheckCircle size={14} className={styles.checkIcon} />
                  <span>Same-day vehicle positioning and dedicated account dispatch available.</span>
                </div>
                <a href="#contact" className={styles.deployBtn}>
                  Deploy Fleet in this Region
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4 Nationwide Capability Cards */}
        <div className={styles.coverageGrid}>
          {coveragePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className={styles.coverageCard}>
                <div className={styles.coverageIcon}>
                  <Icon size={20} />
                </div>
                <h4 className={styles.coverageTitle}>{pillar.title}</h4>
                <p className={styles.coverageDesc}>{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Presence;
