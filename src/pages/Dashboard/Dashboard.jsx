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
  Lock,
  LogOut,
  ShieldCheck,
  Download,
  Phone,
  RefreshCw,
  Search,
  ExternalLink,
} from 'lucide-react';
import {
  getDashboardStats,
  getFleet,
  getQuoteRequests,
  updateQuoteRequestStatus,
  adminLogin,
  isAdminAuthenticated,
  adminLogout,
} from '../../services/api';
import { generateQuotePDF } from '../../utils/pdfGenerator';
import styles from './Dashboard.module.css';
import logo from '../../assets/logo.jpeg';

const STATUS_ORDER = ['new', 'contacted', 'confirmed', 'completed'];

const STATUS_LABELS = {
  new: 'New / Queued',
  contacted: 'Active Review',
  confirmed: 'Confirmed & Positioned',
  completed: 'Trip Completed',
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
  { key: 'quote_requests_7d', icon: Inbox, title: 'Requests · 7 Days' },
  { key: 'active_fleet', icon: CarFront, title: 'Active Fleet' },
  { key: 'avg_response_hours', icon: Clock, title: 'Avg Response SLA' },
  { key: 'sla_compliance_pct', icon: ShieldCheck, title: 'SLA Compliance' },
];

const FLEET_ICONS = {
  sedans: CarFront,
  suvs: Truck,
  travellers: Bus,
  coaches: Bus,
};

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
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminAuthenticated());
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [stats, setStats] = useState(null);
  const [fleet, setFleet] = useState(null);
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadAll = useCallback(async () => {
    if (!isAdminAuthenticated()) return;
    setLoading(true);
    try {
      const [statsData, fleetData, requestsData] = await Promise.all([
        getDashboardStats(),
        getFleet(),
        getQuoteRequests(),
      ]);
      setStats(statsData);
      setFleet(fleetData);
      setRequests(requestsData);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadAll();
    }
  }, [isAuthenticated, loadAll]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    try {
      await adminLogin(passcode);
      setIsAuthenticated(true);
    } catch (err) {
      setAuthError(err?.message || 'Invalid Operations Passcode');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    adminLogout();
    setIsAuthenticated(false);
    setPasscode('');
  };

  const cycleStatus = useCallback(async (id, currentStatus) => {
    const nextStatus = STATUS_ORDER[(STATUS_ORDER.indexOf(currentStatus) + 1) % STATUS_ORDER.length] || 'new';
    setRequests((prev) =>
      prev ? prev.map((r) => (r.id === id || r.reference_id === id ? { ...r, status: nextStatus } : r)) : []
    );
    try {
      await updateQuoteRequestStatus(id, nextStatus);
    } catch (err) {
      console.error(err);
      loadAll();
    }
  }, [loadAll]);

  // If not logged in, show Enterprise Operations Gate
  if (!isAuthenticated) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <div className={styles.brand}>
              <img src={logo} alt="Amabze Logo" className={styles.logoImage} />
              <span className={styles.brandName}>AMABZE RENTALS</span>
            </div>
            <Link to="/" className={styles.backLink}>
              <ChevronLeft size={16} />
              Back to site
            </Link>
          </div>
        </header>

        <div className={styles.authContainer}>
          <div className={styles.authCard}>
            <div className={styles.authIconBox}>
              <Lock size={28} className={styles.authLockIcon} />
            </div>
            <h2>Amabze Fleet Command Portal</h2>
            <p>Enter the operations desk passcode to manage reservations, vehicle allocation, and driver dispatch.</p>

            <form onSubmit={handleLogin} className={styles.authForm}>
              <input
                type="password"
                placeholder="Enter Operations Passcode (Default: amabze2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
              />
              {authError && <div className={styles.authErrorText}>{authError}</div>}
              <button type="submit" disabled={authLoading || !passcode.trim()} className={styles.btnAuthSubmit}>
                {authLoading ? <Loader2 size={16} className={styles.spinner} /> : 'Access Command Portal'}
              </button>
            </form>

            <div className={styles.authHint}>
              <span>Authorized Personnel: Mahesh Chauhan / Rajender Kumar</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredRequests = (requests || []).filter((req) => {
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      req.name?.toLowerCase().includes(q) ||
      req.company?.toLowerCase().includes(q) ||
      req.reference_id?.toLowerCase().includes(q) ||
      req.pickup?.toLowerCase().includes(q) ||
      req.destination?.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <img src={logo} alt="Amabze Rentals Logo" className={styles.logoImage} />
            <div>
              <span className={styles.brandName}>AMABZE RENTALS</span>
              <span className={styles.brandBadge}>FLEET COMMAND PORTAL</span>
            </div>
          </div>

          <div className={styles.headerDeskActions}>
            <button type="button" onClick={loadAll} className={styles.btnReload} title="Refresh live data">
              <RefreshCw size={14} />
              <span>Refresh</span>
            </button>
            <button type="button" onClick={handleLogout} className={styles.btnLogout}>
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
            <Link to="/" className={styles.backLink}>
              <ChevronLeft size={16} />
              Back to site
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.pageIntro}>
          <div>
            <h1 className={styles.pageTitle}>Central Fleet & Booking Dispatch</h1>
            <p className={styles.pageSubtitle}>
              Live reservations management, client SLA tracking, and instant PDF quote generation.
            </p>
          </div>
          <div className={styles.dutyDeskCard}>
            <span>Duty Hotline: <strong>0124 4974856</strong></span>
            <span>Desk Email: <code>reservation@amabzerentals.com</code></span>
          </div>
        </div>

        {loading ? (
          <div className={styles.loadingState} role="status">
            <Loader2 size={20} className={styles.spinner} />
            <span>Loading central fleet telemetry…</span>
          </div>
        ) : (
          <>
            {/* Metrics */}
            <section className={styles.section} aria-label="Key metrics">
              <div className={styles.metricsGrid}>
                {METRIC_ICONS.map(({ key, icon: Icon, title }, index) => {
                  const value = stats?.[key] ?? '—';
                  return (
                    <motion.div
                      key={key}
                      className={styles.metricCard}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <div className={styles.metricIcon}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className={styles.metricValue}>{value}</div>
                        <div className={styles.metricLabel}>{title}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Fleet Status */}
            <section className={styles.section} aria-label="Fleet status">
              <h2 className={styles.sectionTitle}>Live Available Commercial Fleet (300+ Verified Units)</h2>
              <div className={styles.fleetGrid}>
                {fleet?.map((item, index) => {
                  const Icon = FLEET_ICONS[item.id] || CarFront;
                  return (
                    <motion.div
                      key={item.id}
                      className={styles.fleetCard}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <div className={styles.fleetCardTop}>
                        <div className={styles.fleetIcon}>
                          <Icon size={20} />
                        </div>
                        <span className={styles.availabilityBadge}>
                          {item.available} Free / {item.total} Total
                        </span>
                      </div>
                      <h3 className={styles.fleetName}>{item.name}</h3>
                      <p className={styles.fleetVehicles}>{item.vehicles}</p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Recent Requests Table with PDF Generator & Status Advancer */}
            <section className={styles.section} aria-label="Recent quote requests">
              <div className={styles.requestsHeaderRow}>
                <div>
                  <h2 className={styles.sectionTitle}>Registered Client Bookings ({filteredRequests.length})</h2>
                  <p className={styles.sectionSub}>Click any status pill to advance: <em>New ➔ Active Review ➔ Confirmed ➔ Completed</em></p>
                </div>

                <div className={styles.filterControls}>
                  <div className={styles.searchBox}>
                    <Search size={14} />
                    <input
                      type="text"
                      placeholder="Search company, name, ref..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={styles.statusSelect}
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Active Review</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className={styles.requestsList}>
                {filteredRequests.length === 0 && (
                  <p className={styles.emptyState}>No bookings matching criteria.</p>
                )}

                {filteredRequests.map((request, index) => (
                  <motion.div
                    key={request.id || request.reference_id}
                    className={styles.requestRow}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.3 }}
                  >
                    <div className={styles.requestMain}>
                      <div className={styles.requestTopBar}>
                        <span className={styles.refTag}>{request.reference_id || `AMB-2026-${request.id}`}</span>
                        <span className={styles.reqCompany}>{request.company || 'Corporate Client'}</span>
                        <span className={styles.reqName}>• {request.name} ({request.phone})</span>
                      </div>

                      <div className={styles.requestService}>
                        {SERVICE_LABELS[request.service_type] || request.service_type}
                      </div>

                      <div className={styles.requestRoute}>
                        <strong>Route:</strong> {request.pickup} {request.destination ? ` → ${request.destination}` : ''}
                        {request.date ? ` · Date: ${formatDate(request.date)}` : ''} · Group: {request.passengers || '1-4'}
                      </div>

                      {request.notes && (
                        <div className={styles.requestNotes}>
                          <span>Note: {request.notes}</span>
                        </div>
                      )}
                    </div>

                    <div className={styles.requestActions}>
                      <button
                        type="button"
                        className={styles.btnDownloadPdf}
                        onClick={() => generateQuotePDF(request)}
                        title="Download PDF Quotation & Specifications"
                      >
                        <Download size={14} />
                        <span>PDF Estimate</span>
                      </button>

                      <a
                        href={`https://wa.me/${request.phone?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello ${request.name}, this is Amabze Corporate Fleet Desk regarding your booking reference ${request.reference_id}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btnChatWa}
                        title="Open WhatsApp chat with client"
                      >
                        <ExternalLink size={13} />
                        <span>WhatsApp Client</span>
                      </a>

                      <button
                        type="button"
                        className={`${styles.statusBadge} ${styles[`status_${request.status}`] || styles.status_new}`}
                        onClick={() => cycleStatus(request.id, request.status)}
                        title="Click to advance status"
                      >
                        {STATUS_LABELS[request.status] || request.status}
                      </button>
                    </div>
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
