import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Inbox,
  CarFront,
  Clock,
  Repeat,
  Bus,
  Truck,
  ChevronLeft,
  Loader2,
} from 'lucide-react';
import {
  getDashboardStats,
  getFleet,
  getQuoteRequests,
  updateQuoteRequestStatus,
} from '../../services/api';
import styles from './Dashboard.module.css';
import logo from '../../assets/logo.jpeg';

const STATUS_ORDER = ['new', 'contacted', 'confirmed'];

const STATUS_LABELS = {
  new: 'New',
  contacted: 'Contacted',
  confirmed: 'Confirmed',
};

const SERVICE_LABELS = {
  'corporate-commute': 'Corporate Employee Transport',
  'chauffeur-transfer': 'Executive Chauffeur Transfer',
  'airport-transfer': 'Airport Pickup / Drop-off',
  outstation: 'Outstation / Intercity Trip',
  'event-logistics': 'Event & Conference Logistics',
  'monthly-rental': 'Monthly Vehicle Rental',
};

const METRIC_ICONS = [
  { key: 'quote_requests_7d', icon: Inbox },
  { key: 'active_fleet', icon: CarFront },
  { key: 'avg_response_hours', icon: Clock },
  { key: 'repeat_client_pct', icon: Repeat },
];

const METRIC_TITLES = {
  quote_requests_7d: 'Quote requests · 7d',
  active_fleet: 'Active fleet',
  avg_response_hours: 'Avg response time',
  repeat_client_pct: 'Repeat clients',
};

const METRIC_FORMATTERS = {
  avg_response_hours: (v) => (v === null || v === undefined ? '—' : `${v}h`),
  repeat_client_pct: (v) => (v === null || v === undefined ? '—' : `${v}%`),
};

const FLEET_ICONS = {
  sedans: CarFront,
  suvs: Truck,
  coaches: Bus,
};

const FLEET_LOW_THRESHOLD = 0.3;

function DashboardHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.brand}>
          <img src={logo} alt="Amabze Rentals Logo" className={styles.logoImage} />
          <span className={styles.brandName}>AMABZE RENTALS</span>
        </div>
        <Link to="/" className={styles.backLink}>
          <ChevronLeft size={16} />
          Back to site
        </Link>
      </div>
    </header>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [fleet, setFleet] = useState(null);
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAll = useCallback(async () => {
    setLoading(true);
    const [statsData, fleetData, requestsData] = await Promise.all([
      getDashboardStats(),
      getFleet(),
      getQuoteRequests(),
    ]);
    setStats(statsData);
    setFleet(fleetData);
    setRequests(requestsData);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const cycleStatus = useCallback(async (id, currentStatus) => {
    if (!STATUS_ORDER.includes(currentStatus)) return;
    const nextStatus = STATUS_ORDER[(STATUS_ORDER.indexOf(currentStatus) + 1) % STATUS_ORDER.length];
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: nextStatus } : r)),
    );
    try {
      await updateQuoteRequestStatus(id, nextStatus);
    } catch {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: currentStatus } : r)),
      );
    }
  }, []);

  const availabilityClass = (item) => {
    const ratio = item.total > 0 ? item.available / item.total : 0;
    return ratio >= FLEET_LOW_THRESHOLD ? styles.badgeHealthy : styles.badgeLow;
  };

  return (
    <div className={styles.page}>
      <DashboardHeader />
      <main className={styles.main}>
        <div className={styles.pageIntro}>
          <h1 className={styles.pageTitle}>Operations Dashboard</h1>
          <p className={styles.pageSubtitle}>Live overview of quotes, fleet availability, and recent requests.</p>
        </div>

        {loading ? (
          <div className={styles.loadingState} role="status">
            <Loader2 size={20} className={styles.spinner} />
            <span>Loading dashboard…</span>
          </div>
        ) : (
          <>
            {/* ── Metric cards ── */}
            <section className={styles.section} aria-label="Key metrics">
              <div className={styles.metricsGrid}>
                {METRIC_ICONS.map(({ key, icon: Icon }, index) => {
                  const value = stats?.[key];
                  const formatter = METRIC_FORMATTERS[key];
                  const display = formatter ? formatter(value) : value ?? '—';
                  return (
                    <motion.div
                      key={key}
                      className={styles.metricCard}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className={styles.metricIcon}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className={styles.metricValue}>{display}</div>
                        <div className={styles.metricLabel}>{METRIC_TITLES[key]}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* ── Fleet status ── */}
            <section className={styles.section} aria-label="Fleet status">
              <h2 className={styles.sectionTitle}>Fleet status</h2>
              <div className={styles.fleetGrid}>
                {fleet?.map((item, index) => {
                  const Icon = FLEET_ICONS[item.id] || CarFront;
                  return (
                    <motion.div
                      key={item.id}
                      className={styles.fleetCard}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className={styles.fleetCardTop}>
                        <div className={styles.fleetIcon}>
                          <Icon size={20} />
                        </div>
                        <span className={`${styles.availabilityBadge} ${availabilityClass(item)}`}>
                          {item.available} free
                        </span>
                      </div>
                      <h3 className={styles.fleetName}>{item.name}</h3>
                      <p className={styles.fleetVehicles}>{item.vehicles}</p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* ── Recent requests ── */}
            <section className={styles.section} aria-label="Recent quote requests">
              <h2 className={styles.sectionTitle}>Recent requests</h2>
              <div className={styles.requestsList}>
                {requests?.length === 0 && (
                  <p className={styles.emptyState}>No quote requests yet.</p>
                )}
                {requests?.map((request, index) => (
                  <motion.div
                    key={request.id}
                    className={styles.requestRow}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className={styles.requestInfo}>
                      <div className={styles.requestService}>
                        {SERVICE_LABELS[request.service_type] || request.service_type}
                      </div>
                      <div className={styles.requestRoute}>
                        {request.pickup}
                        {request.destination ? ` → ${request.destination}` : ''}
                        {request.date ? ` · ${formatDate(request.date)}` : ''}
                      </div>
                    </div>
                    <button
                      type="button"
                      className={`${styles.statusBadge} ${STATUS_ORDER.includes(request.status) ? styles[`status_${request.status}`] : styles.statusUnknown}`}
                      onClick={() => cycleStatus(request.id, request.status)}
                      aria-label={
                        STATUS_ORDER.includes(request.status)
                          ? `Status: ${STATUS_LABELS[request.status]}. Click to advance to ${STATUS_LABELS[STATUS_ORDER[(STATUS_ORDER.indexOf(request.status) + 1) % STATUS_ORDER.length]]}`
                          : `Status: ${request.status}`
                      }
                      title={
                        STATUS_ORDER.includes(request.status)
                          ? `${STATUS_LABELS[request.status]} — click to advance`
                          : request.status
                      }
                    >
                      {STATUS_LABELS[request.status] || request.status}
                    </button>
                  </motion.div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}