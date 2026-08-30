import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, AlertCircle, CheckCircle2, Clock, MapPin, Calendar, Users, Phone, X } from 'lucide-react';
import { trackBookingByRef } from '../../services/api';
import styles from './TrackModal.module.css';

export default function TrackModal({ isOpen, onClose }) {
  const [refId, setRefId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  if (!isOpen) return null;

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!refId.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await trackBookingByRef(refId.trim());
      setBookingData(data);
    } catch (err) {
      console.error(err);
      setError(err?.message || 'Could not find booking with this reference ID. Please verify or call desk.');
      setBookingData(null);
    } finally {
      setLoading(false);
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

  return (
    <AnimatePresence>
      <div className={styles.backdrop} onClick={onClose}>
        <motion.div
          className={styles.modalCard}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <div className={styles.modalHeader}>
            <div className={styles.headerLeft}>
              <span className={styles.tag}>LIVE DISPATCH TRACKER</span>
              <h3>Track Corporate Booking Request</h3>
            </div>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleTrack} className={styles.searchForm}>
            <div className={styles.inputWrapper}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Enter Reference ID (e.g. AMB-2026-10101)"
                value={refId}
                onChange={(e) => setRefId(e.target.value)}
                autoFocus
              />
              <button type="submit" className={styles.btnSearch} disabled={loading || !refId.trim()}>
                {loading ? <Loader2 size={14} className={styles.spinner} /> : 'Track'}
              </button>
            </div>
          </form>

          {error && (
            <div className={styles.errorBox}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {bookingData && (
            <div className={styles.resultContainer}>
              <div className={styles.statusBarRow}>
                <div>
                  <span className={styles.resRef}>{bookingData.reference_id}</span>
                  <span className={styles.resClient}>{bookingData.name} • {bookingData.company}</span>
                </div>
                <span className={`${styles.statusPill} ${getStatusBadge(bookingData.status).class}`}>
                  {getStatusBadge(bookingData.status).label}
                </span>
              </div>

              <div className={styles.timelineBox}>
                <div className={styles.timelineStepActive}>
                  <div className={styles.timelineDot} />
                  <div>
                    <strong>1. Request Registered</strong>
                    <p>Logged in Central Dispatch</p>
                  </div>
                </div>
                <div className={bookingData.status !== 'new' ? styles.timelineStepActive : styles.timelineStepPending}>
                  <div className={styles.timelineDot} />
                  <div>
                    <strong>2. Fleet Allocation</strong>
                    <p>Reviewing garage positioning</p>
                  </div>
                </div>
                <div className={bookingData.status === 'confirmed' || bookingData.status === 'completed' ? styles.timelineStepActive : styles.timelineStepPending}>
                  <div className={styles.timelineDot} />
                  <div>
                    <strong>3. Chauffeur Assigned</strong>
                    <p>SMS & Duty slip dispatch</p>
                  </div>
                </div>
              </div>

              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <MapPin size={14} />
                  <span><strong>Pickup:</strong> {bookingData.pickup}</span>
                </div>
                <div className={styles.detailItem}>
                  <MapPin size={14} />
                  <span><strong>Drop:</strong> {bookingData.destination || 'As Directed'}</span>
                </div>
                <div className={styles.detailItem}>
                  <Calendar size={14} />
                  <span><strong>Date:</strong> {bookingData.date}</span>
                </div>
                <div className={styles.detailItem}>
                  <Users size={14} />
                  <span><strong>Group:</strong> {bookingData.passengers}</span>
                </div>
              </div>

              <div className={styles.slaBox}>
                <Clock size={14} />
                <span>
                  Our central team reviews requests within <strong>2–3 hours</strong>. For urgent positioning, call <strong>0124 4974856</strong>.
                </span>
              </div>
            </div>
          )}

          <div className={styles.modalFooter}>
            <span>Need immediate same-day positioning?</span>
            <a href="tel:01244974856" className={styles.callHotline}>
              <Phone size={13} />
              <span>0124 4974856 (24x7 Control Room)</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
