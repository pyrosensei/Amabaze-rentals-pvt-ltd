import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Radio, Award, Sparkles, Navigation, CheckCircle2 } from 'lucide-react';
import styles from './Hero.module.css';
import heroCar from '../../assets/hero-car.jpg';

const nationwideFeatures = [
  'Pan-India Fleet Deployment',
  '24×7 Central Dispatch Desk',
  '100% Statutory Compliance (PF/ESIC)',
  'Zero Surge Corporate Billing',
  'Real-Time GPS Telematics',
  'Verified & Uniformed Chauffeurs',
  'Executive Airport VIP Protocols',
  'Dedicated Account Management',
];

const Hero = () => {
  return (
    <section className={styles.heroSection} id="hero">
      {/* Ambient background glow */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.container}>
        {/* Left Column: Value Proposition & CTAs */}
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className={styles.eyebrowBadge}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
          >
            <span className={styles.pulseLiveDot} />
            <span className={styles.eyebrowText}>PAN-INDIA ENTERPRISE MOBILITY SOLUTIONS</span>
          </motion.div>

          <motion.h1
            className={styles.heading}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.55 }}
          >
            Executive Chauffeur & Fleet Solutions{' '}
            <span className={styles.accentGradient}>Across India</span>
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.55 }}
          >
            Delivering verified chauffeur-driven mobility, employee daily commute transit,
            executive airport transfers, and customized fleet leasing nationwide with guaranteed
            SLAs and 100% statutory compliance.
          </motion.p>

          {/* Key Value Highlight Pills */}
          <motion.div
            className={styles.highlightPills}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.55 }}
          >
            <div className={styles.pillItem}>
              <ShieldCheck size={16} className={styles.pillIcon} />
              <span>100% Audited & Insured</span>
            </div>
            <div className={styles.pillItem}>
              <Radio size={16} className={styles.pillIcon} />
              <span>Live Telematics Monitored</span>
            </div>
            <div className={styles.pillItem}>
              <Award size={16} className={styles.pillIcon} />
              <span>99.4% On-Time SLA</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className={styles.buttonGroup}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.55 }}
          >
            <motion.a
              href="#contact"
              className={styles.primaryButton}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Request Corporate Proposal</span>
              <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="#fleet"
              className={styles.secondaryButton}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles size={16} className={styles.calcIcon} />
              <span>Explore Fleet Inventory</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Column: Hero Vehicle Showcase with Floating Live Status Cards */}
        <motion.div
          className={styles.visualStage}
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.carStageWrapper}>
            <div className={styles.carImageContainer}>
              <img
                src={heroCar}
                alt="Amabze Rentals executive sedan fleet with verified chauffeur"
                className={styles.heroCarImage}
                fetchPriority="high"
              />
              <div className={styles.carGradientOverlay} />
            </div>

            {/* Floating Telematics Badge: Top-Right */}
            <motion.div
              className={styles.floatingGpsBadge}
              initial={{ opacity: 0, x: 20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className={styles.gpsIconWrap}>
                <Navigation size={15} />
              </div>
              <div className={styles.badgeInfo}>
                <span className={styles.badgeTitle}>Live Operations</span>
                <span className={styles.badgeSub}>Pan-India Telematics Active</span>
              </div>
            </motion.div>

            {/* Floating Trust Badge: Bottom-Left */}
            <motion.div
              className={styles.floatingFleetBadge}
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
            >
              <div className={styles.fleetIconWrap}>
                <CheckCircle2 size={16} />
              </div>
              <div className={styles.badgeInfo}>
                <span className={styles.badgeTitle}>300+ Commercial Fleet</span>
                <span className={styles.badgeSub}>All-India Permits & GST Ready</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Nationwide Capabilities Marquee */}
      <div className={styles.marqueeSection} aria-label="Nationwide operational standards">
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeHeaderBadge}>
            <span className={styles.marqueeDotPulse} />
            <span>NATIONWIDE STANDARDS</span>
          </div>

          <div className={styles.marqueeTrackContainer}>
            <div className={styles.marqueeTrack}>
              {[...nationwideFeatures, ...nationwideFeatures, ...nationwideFeatures, ...nationwideFeatures].map(
                (item, index) => (
                  <span className={styles.marqueeItem} key={index}>
                    <span className={styles.marqueeBullet} />
                    <span>{item}</span>
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
