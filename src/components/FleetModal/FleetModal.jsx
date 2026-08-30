import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Briefcase, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import styles from './FleetModal.module.css';
import { EASE, spring } from '../../lib/motion';

export default function FleetModal({ item, onClose, onBook }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!item) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const focusables = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    const previousFocus = document.activeElement;
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
      previousFocus?.focus?.();
    };
  }, [item, onClose]);

  const features =
    item?.features || [
      'Real-time GPS Tracking',
      'Background-Verified Chauffeur',
      'First Aid & Safety Kit',
      'Climate Control / AC',
      'Commercial Insurance Covered',
      'Sanitized Interiors',
      'Flight Tracking for Airport Drops',
      '24/7 Travel Desk Support',
    ];

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className={styles.overlay}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE }}
        >
          <motion.div
            ref={modalRef}
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ ...spring, duration: 0.35 }}
          >
            <button
              ref={closeButtonRef}
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close vehicle specifications modal"
            >
              <X size={20} />
            </button>

            <div className={styles.headerImageWrapper}>
              <img src={item.image} alt={item.name} className={styles.headerImage} />
              <span className={styles.categoryTag}>{item.category || 'Executive Fleet'}</span>
            </div>

            <div className={styles.body}>
              <div className={styles.titleRow}>
                <h3>{item.name}</h3>
              </div>
              <p className={styles.vehiclesList}>{item.vehicles}</p>
              <p className={styles.description}>{item.description}</p>

              <div className={styles.specsGrid}>
                <div className={styles.specBox}>
                  <div className={styles.specIcon}>
                    <Users size={18} />
                  </div>
                  <div className={styles.specText}>
                    <strong>Passenger Capacity</strong>
                    <span>{item.capacity}</span>
                  </div>
                </div>

                <div className={styles.specBox}>
                  <div className={styles.specIcon}>
                    <Briefcase size={18} />
                  </div>
                  <div className={styles.specText}>
                    <strong>Luggage Capacity</strong>
                    <span>{item.luggage}</span>
                  </div>
                </div>

                <div className={styles.specBox}>
                  <div className={styles.specIcon}>
                    <ShieldCheck size={18} />
                  </div>
                  <div className={styles.specText}>
                    <strong>Compliance Status</strong>
                    <span>100% Verified</span>
                  </div>
                </div>
              </div>

              <div className={styles.featureSection}>
                <h4>Included Vehicle Standards & Safety Features</h4>
                <div className={styles.featureList}>
                  {features.map((feature, idx) => (
                    <div key={idx} className={styles.featureItem}>
                      <Check size={16} className={styles.checkIcon} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.bookButton}
                  onClick={() => {
                    onClose();
                    if (onBook) onBook(item);
                  }}
                >
                  <span>Book This Vehicle</span>
                  <ArrowRight size={16} />
                </button>
                <button className={styles.cancelButton} onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}