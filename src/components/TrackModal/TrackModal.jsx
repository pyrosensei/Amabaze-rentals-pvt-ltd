import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Loader2,
  AlertCircle,
  Clock,
  MapPin,
  Calendar,
  Users,
  Phone,
  X,
  ShieldCheck,
} from 'lucide-react';
import { trackBookingByRef } from '../../services/api';
import styles from './TrackModal.module.css';

export default function TrackModal({ isOpen, onClose }) {
  const [refId, setRefId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const inputRef = useRef(null);
  const backdropRef = useRef(null);

  // Lock body scroll and set up Escape listener
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Focus input safely without triggering viewport jump
    const focusTimer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    }, 80);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);
    };
  }, [isOpen, onClose]);

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    if (!refId.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await trackBookingByRef(refId.trim());
      setBookingData(data);
    } catch (err) {
      console.error(err);
      setError(
        err?.message ||
          'Could not find a booking with this reference ID. Please verify your reference ID or contact the central desk.'
      );
      setBookingData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return { label: 'CONFIRMED & POSITIONED', class: styles.statusConfirmed };
      case 'contacted':
        return { label: 'UNDER ACTIVE DISPATCH', class: styles.statusContacted };
      case 'completed':
        return { label: 'TRIP COMPLETED', class: styles.statusCompleted };
      default:
        return { label: 'REQUEST RECEIVED & QUEUED', class: styles.statusNew };
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          ref={backdropRef}
          className={styles.backdrop}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="track-modal-title"
        >
          <motion.div
            className={styles.modalCard}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Modal Header with Prominent Close Button */}
            <div className={styles.modalHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.headerTagRow}>
                  <ShieldCheck size={13} className={styles.shieldIcon} />
                  <span className={styles.tag}>CENTRAL DISPATCH TELEMATICS</span>
                </div>
                <h3 id="track-modal-title">Track Booking Status</h3>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close tracking modal"
                title="Close (Esc)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Input without autoFocus jump */}
            <form onSubmit={handleTrack} className={styles.searchForm}>
              <div className={styles.inputWrapper}>
                <Search size={16} className={styles.searchIcon} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Enter Reference ID (e.g. AMB-2026-84920)"
                  value={refId}
                  onChange={(e) => setRefId(e.target.value)}
                  autoComplete="off"
                  spellCheck="false"
                />
                <button
                  type="submit"
                  className={styles.btnSearch}
                  disabled={loading || !refId.trim()}
                >
                  {loading ? <Loader2 size={14} className={styles.spinner} /> : 'Track'}
                </button>
              </div>
            </form>

            {error && (
              <div className={styles.errorBox}>
                <AlertCircle size={16} className={styles.errorIcon} />
                <span>{error}</span>
              </div>
            )}

            {bookingData && (
              <div className={styles.resultContainer}>
                <div className={styles.statusBarRow}>
                  <div>
                    <span className={styles.resRef}>{bookingData.reference_id}</span>
                    <span className={styles.resClient}>
                      {bookingData.name} {bookingData.company ? `• ${bookingData.company}` : ''}
                    </span>
                  </div>
                  <span
                    className={`${styles.statusPill} ${
                      getStatusBadge(bookingData.status).class
                    }`}
                  >
                    {getStatusBadge(bookingData.status).label}
                  </span>
                </div>

                <div className={styles.timelineBox}>
                  <div className={styles.timelineStepActive}>
                    <div className={styles.timelineDot} />
                    <div>
                      <strong>1. Registered</strong>
                      <p>Central Queue</p>
                    </div>
                  </div>
                  <div
                    className={
                      bookingData.status !== 'new'
                        ? styles.timelineStepActive
                        : styles.timelineStepPending
                    }
                  >
                    <div className={styles.timelineDot} />
                    <div>
                      <strong>2. Fleet Allocation</strong>
                      <p>Garage Review</p>
                    </div>
                  </div>
                  <div
                    className={
                      bookingData.status === 'confirmed' || bookingData.status === 'completed'
                        ? styles.timelineStepActive
                        : styles.timelineStepPending
                    }
                  >
                    <div className={styles.timelineDot} />
                    <div>
                      <strong>3. Chauffeur Assigned</strong>
                      <p>Duty Slip Ready</p>
                    </div>
                  </div>
                </div>

                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <MapPin size={13} />
                    <span>
                      <strong>Pickup:</strong> {bookingData.pickup}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <MapPin size={13} />
                    <span>
                      <strong>Drop:</strong> {bookingData.destination || 'As Directed'}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <Calendar size={13} />
                    <span>
                      <strong>Date:</strong> {bookingData.date || 'Scheduled'}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <Users size={13} />
                    <span>
                      <strong>Group:</strong> {bookingData.passengers || '1-4'}
                    </span>
                  </div>
                </div>

                <div className={styles.slaBox}>
                  <Clock size={14} className={styles.slaIcon} />
                  <span>
                    Our team is actively reviewing your request and will update you within{' '}
                    <strong>2–3 hours</strong>.
                  </span>
                </div>
              </div>
            )}

            {/* Modal Footer with Support Contacts */}
            <div className={styles.modalFooter}>
              <span>Need immediate assistance?</span>
              <a href="tel:01244974856" className={styles.callHotline}>
                <Phone size={13} />
                <span>0124 4974856</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
