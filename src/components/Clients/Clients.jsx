import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Clients.module.css';

const clientsList = [
  { name: 'Samsung Hospitality', category: 'Consumer Tech & Global Mobility' },
  { name: 'DLF Limited', category: 'Real Estate & Infrastructure' },
  { name: 'Michael Page', category: 'Global Recruitment & Advisory' },
  { name: 'Wizcraft Entertainment', category: 'Mega Events & Logistics' },
  { name: 'Cyril Amarchand Mangaldas', category: 'Premier Legal Advisory' },
  { name: 'Ford Mobility India', category: 'Automotive & Transit' },
  { name: 'Cleartrip Tours & Packages', category: 'Travel & Leisure Enterprise' },
  { name: 'ATS Greens', category: 'Infrastructure & Construction' },
  { name: 'SKH Metals Limited', category: 'Industrial & Manufacturing' },
  { name: 'Manipal Higher Education', category: 'Academic Institutions' },
  { name: 'Prospecta Software', category: 'Technology Solutions' },
  { name: 'Galaxy India Opco', category: 'Enterprise Operations' },
  { name: 'Meridian Solutions', category: 'Cloud & IT Services' },
  { name: 'HIL Infotech LLP', category: 'Information Technology' },
  { name: 'Meetings & More', category: 'MICE & Corporate Summits' },
  { name: 'Grey Head Media', category: 'Digital Media & Communications' },
];

const Clients = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

  return (
    <motion.section
      ref={ref}
      id="clients"
      className={styles.clientsSection}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>
            TRUSTED PARTNERS
          </span>
          <h2 className={styles.heading}>
            Partnered with Industry Leaders
          </h2>
          <p className={styles.subtitle}>
            Delivering seamless corporate mobility, executive transfers, and nationwide transport solutions to leading Fortune 500 enterprises.
          </p>
        </div>

        <div className={styles.marqueeWrapper}>
          <div className={styles.fadeLeft} />
          <div className={styles.fadeRight} />
          
          <div className={styles.marqueeTrack}>
            {[...clientsList, ...clientsList].map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className={styles.clientCard}
              >
                <div className={styles.clientBadge}>
                  <span className={styles.clientName}>{client.name}</span>
                  <span className={styles.clientCategory}>{client.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Clients;
