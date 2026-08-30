import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import styles from './FAQ.module.css';

const faqs = [
  {
    question: 'What statutory compliances does Amabze Rentals maintain for corporate contracts?',
    answer: 'Amabze Rentals Private Limited (CIN: U34300HR2022PTC102048) maintains 100% statutory compliance including Provident Fund (PF), ESIC registration, commercial vehicle permits, comprehensive passenger insurance, and verified driver credentials. All compliance logs are available for vendor audit inspections.',
  },
  {
    question: 'How are chauffeurs vetted and trained before assignment?',
    answer: 'All drivers undergo strict background verification, criminal record checks, defensive-driving certification, and etiquette training. Drivers assigned to airport transfers and corporate executive routes are equipped with smartphone navigation and real-time travel desk support.',
  },
  {
    question: 'Are vehicles equipped with GPS tracking and safety telemetry?',
    answer: 'Yes, 100% of our fleet (sedans, SUVs, tempo travellers, and Volvo buses) are equipped with real-time GPS telemetry, speed limiters, and panic alert features connected directly to our 24/7 Gurugram travel control room.',
  },
  {
    question: 'How does corporate monthly billing and GST invoicing work?',
    answer: 'We provide structured monthly billing cycles for corporate clients with detailed logbook attachments, route metrics, and itemized GST invoices compliant with corporate accounting standards.',
  },
  {
    question: 'What happens if a flight is delayed during an airport transfer?',
    answer: 'Our travel desk continuously monitors flight status via real-time telemetry. Chauffeur pickup schedules are automatically adjusted for delays, ensuring your executive or guest is met at the terminal arrivals gate without added stress.',
  },
  {
    question: 'Can Amabze Rentals manage multi-city fleet logistics for large corporate events?',
    answer: 'Absolutely. We specialize in end-to-end event logistics including airport shuttles, VIP delegate cars, media team vans, and on-site transport coordinators stationed at venues across 30+ major Indian cities.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>
            <HelpCircle size={14} /> FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className={styles.heading}>Enterprise Mobility & Operational Clarity</h2>
          <p className={styles.subtitle}>
            Answers to common questions regarding corporate vendor compliance, billing, safety standards, and fleet management.
          </p>
        </div>

        <div className={styles.accordionList}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={styles.item}>
                <button
                  className={`${styles.button} ${isOpen ? styles.active : ''}`}
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.question}>{faq.question}</span>
                  <div className={styles.iconBox}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className={styles.answer}>
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
