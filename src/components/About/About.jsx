import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ShieldCheck, MapPin, Radio, Receipt, CheckCircle, Award } from 'lucide-react';
import styles from './About.module.css';
import coachInterior from '../../assets/coach-interior.png';
import aboutCar from '../../assets/about-car.jpg';

const pillars = [
  {
    icon: MapPin,
    title: 'Pan-India Operations',
    description: 'Seamless corporate mobility across major metropolitan centers, tier-1/tier-2 industrial corridors, and airports nationwide.',
  },
  {
    icon: ShieldCheck,
    title: '100% Statutory Compliance',
    description: 'Strict adherence to PF, ESIC, minimum wages, and comprehensive commercial passenger liability insurance.',
  },
  {
    icon: Radio,
    title: '24×7 Telematics & Control',
    description: 'Real-time GPS tracking, speed limiter audits, automated route monitoring, and a dedicated central dispatch command desk.',
  },
  {
    icon: Receipt,
    title: 'Predictable Enterprise Billing',
    description: 'Customized SLA agreements, unified GST-compliant invoicing, zero dynamic surge pricing, and flexible payment terms.',
  },
];

const highlights = [
  '11+ Years of Established Industry Trust with 3 NCR Workstations & Hubs',
  '300+ Verified Commercial Fleet: Euro VI Sedans, Innova Crysta, Force Urbania & Volvo Coaches',
  '100% Statutory Compliance: PF, ESIC, Minimum Wages & Commercial Passenger Liability',
  '24×7×365 Telematics Command Room & Dedicated Key Account Management',
  'Verified & Uniformed Chauffeurs with Defensive Driving Certification',
];

export default function About() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  return (
    <section ref={ref} id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.eyebrow}>
            <Award size={14} />
            <span>ENTERPRISE MOBILITY SPECIALISTS</span>
          </div>
          <h2 className={styles.heading}>
            Reliable Fleet Infrastructure Built For India’s Leading Organizations
          </h2>
          <p className={styles.subtitle}>
            Amabze Rentals Pvt. Ltd. delivers SLA-driven executive transportation, employee daily transit,
            and corporate fleet leasing across India with uncompromising safety and transparency.
          </p>
        </motion.div>

        {/* Visual & Narrative Grid */}
        <div className={styles.mainGrid}>
          {/* Left Column: Visual Showcase with Overlapping Cards */}
          <motion.div
            className={styles.imageColumn}
            initial={{ opacity: 0, x: -24 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className={styles.mainImageCard}>
              <img
                src={coachInterior}
                alt="Luxury corporate coach interior with comfortable executive seating"
                loading="lazy"
                className={styles.mainImage}
              />
              <div className={styles.imageTag}>
                <span className={styles.tagDot} />
                <span>Executive & Group Transit Fleet</span>
              </div>
            </div>

            <div className={styles.floatingImageCard}>
              <img
                src={aboutCar}
                alt="Corporate chauffeur inspecting executive sedan"
                loading="lazy"
                className={styles.secondaryImage}
              />
              <div className={styles.secondaryImageOverlay}>
                <div className={styles.statMini}>
                  <strong>300+</strong>
                  <span>Active Commercial Fleet</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Key Highlights */}
          <motion.div
            className={styles.narrativeColumn}
            initial={{ opacity: 0, x: 24 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.leadText}>
              We empower Fortune 500 enterprises, technology parks, consulting firms, and institutions
              with dependable employee commute networks and bespoke executive travel.
            </div>

            <div className={styles.highlightsList}>
              {highlights.map((item, index) => (
                <div key={index} className={styles.highlightItem}>
                  <CheckCircle size={18} className={styles.highlightIcon} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className={styles.quoteBox}>
              <p>
                “Our mission is simple: zero transit downtime, transparent commercial agreements,
                and absolute peace of mind for corporate travel desks nationwide.”
              </p>
              <div className={styles.quoteAuthor}>— Operations Leadership, Amabze Rentals</div>
            </div>
          </motion.div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className={styles.pillarsGrid}>
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                className={styles.pillarCard}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.45, delay: 0.1 * index + 0.3 }}
              >
                <div className={styles.pillarIconWrapper}>
                  <Icon size={22} />
                </div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDesc}>{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
