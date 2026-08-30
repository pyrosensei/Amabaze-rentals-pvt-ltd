import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { submitQuoteRequest } from '../../services/api';
import { generateQuotePDF } from '../../utils/pdfGenerator';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Loader2,
  AlertCircle,
  Car,
  Users,
  Calendar,
  Building,
  ShieldCheck,
  Clock,
  Download,
  MessageCircle,
} from 'lucide-react';
import styles from './Contact.module.css';

const SERVICE_TYPES = [
  { id: 'corporate-commute', label: 'Corporate Employee Transport', icon: Users, tag: 'Daily Route Commute' },
  { id: 'chauffeur-transfer', label: 'Executive Chauffeur Transfer', icon: Car, tag: 'VIP & Director Travel' },
  { id: 'airport-transfer', label: 'Airport Pickup / Drop-off', icon: MapPin, tag: 'Flight-Tracked Pickup' },
  { id: 'outstation', label: 'Outstation / Intercity Trip', icon: Globe, tag: 'Intercity Chauffeured' },
  { id: 'event-logistics', label: 'Event & Conference Logistics', icon: Building, tag: 'Shuttle Coordination' },
  { id: 'monthly-rental', label: 'Monthly Vehicle Rental', icon: Calendar, tag: 'Long-Term Fleet Leasing' },
];

const TOTAL_STEPS = 3;
const stepTitles = ['Service & Vehicle Type', 'Route & Schedule Details', 'Corporate Credentials'];
const stepDescriptions = [
  'Select your transportation category or custom fleet requirement.',
  'Provide trip locations and dates so we can calculate your proposal.',
  'Where should our travel desk dispatch the official GST quotation?',
];

export default function Contact({ selectedVehicle }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -100px 0px' });
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [referenceId, setReferenceId] = useState(null);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    serviceType: 'chauffeur-transfer',
    pickup: '',
    destination: '',
    date: '',
    passengers: '1-4',
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: '',
  });

  useEffect(() => {
    if (selectedVehicle) {
      if (selectedVehicle.id === 'sedans') setForm((f) => ({ ...f, serviceType: 'chauffeur-transfer', notes: `Requested Vehicle: ${selectedVehicle.name} (${selectedVehicle.vehicles})` }));
      else if (selectedVehicle.id === 'suvs') setForm((f) => ({ ...f, serviceType: 'chauffeur-transfer', notes: `Requested Vehicle: ${selectedVehicle.name} (${selectedVehicle.vehicles})` }));
      else if (selectedVehicle.id === 'travellers') setForm((f) => ({ ...f, serviceType: 'corporate-commute', notes: `Requested Vehicle: ${selectedVehicle.name} (${selectedVehicle.vehicles})` }));
      else if (selectedVehicle.id === 'coaches') setForm((f) => ({ ...f, serviceType: 'event-logistics', notes: `Requested Vehicle: ${selectedVehicle.name} (${selectedVehicle.vehicles})` }));
    }
  }, [selectedVehicle]);

  const update = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  }, [errors]);

  const getStepErrors = useCallback((currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!form.serviceType) newErrors.serviceType = 'Please select a service type';
    }
    if (currentStep === 2) {
      if (!form.pickup.trim()) newErrors.pickup = 'Pickup location is required';
      if (!form.date.trim()) newErrors.date = 'Preferred date is required';
    }
    if (currentStep === 3) {
      if (!form.name.trim()) newErrors.name = 'Full name is required';
      if (!form.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!/^\+?[\d\s\-()]{10,}$/.test(form.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }
    return newErrors;
  }, [form]);

  const canProceed = Object.keys(getStepErrors(step)).length === 0;

  const validateStep = useCallback((currentStep) => {
    const newErrors = getStepErrors(currentStep);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [getStepErrors]);

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await submitQuoteRequest(form);
      setIsSubmitting(false);
      setReferenceId(response?.reference_id || response?.referenceId || `AMB-2026-${(Math.random() * 89999 + 10000).toFixed(0)}`);
      setSubmitted(true);
    } catch (error) {
      console.error('submitQuoteRequest failed:', error);
      setIsSubmitting(false);
      setSubmitError(
        'We could not send your request right now. Please check your connection and try again.'
      );
    }
  };

  const handleReset = () => {
    setStep(1);
    setSubmitted(false);
    setSubmitError(null);
    setReferenceId(null);
    setErrors({});
    setForm({
      serviceType: 'chauffeur-transfer',
      pickup: '',
      destination: '',
      date: '',
      passengers: '1-4',
      name: '',
      company: '',
      email: '',
      phone: '',
      notes: '',
    });
  };

  const selectedServiceObj = SERVICE_TYPES.find((s) => s.id === form.serviceType) || SERVICE_TYPES[0];

  return (
    <motion.section
      ref={ref}
      className={styles.contact}
      id="contact"
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container">
        <div className={styles.grid}>
          {/* ── Left: Corporate Contact Info & Summary ── */}
          <div className={styles.info}>
            <span className={styles.eyebrow}>
              <span>⚡</span> B2B QUOTE & RESERVATIONS
            </span>
            <h2>Let's Plan Your Corporate Fleet Journey</h2>
            <p>
              Contact Amabze Rentals for enterprise vehicle leasing, employee transit contracts, executive transfers, and pan-India event logistics.
            </p>

            {/* Live proposal badge indicator */}
            <div className={styles.quoteSummaryCard}>
              <div className={styles.summaryHeader}>
                <Clock size={16} className={styles.summaryIcon} />
                <span>24/7 Corporate Response Window</span>
              </div>
              <p className={styles.summaryBody}>
                Guaranteed quotation dispatch within <strong>15 minutes</strong> during business hours.
              </p>
              <div className={styles.summaryPill}>
                <span>Selected: {selectedServiceObj.label}</span>
              </div>
            </div>

            <div className={styles.contactMethods}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <MapPin size={18} />
                </div>
                <div className={styles.contactText}>
                  <strong>Headquarters</strong>
                  <span>
                    No-S 4, Leisure Valley Park, Huda Market, Sector-29, Gurugram, Haryana - 122002
                  </span>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <Phone size={18} />
                </div>
                <div className={styles.contactText}>
                  <strong>Direct Desk Phone</strong>
                  <span>
                    <a href="tel:01244974856">0124 497 4856</a> • <a href="tel:+917982265845">+91 7982 265 845</a>
                  </span>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <Mail size={18} />
                </div>
                <div className={styles.contactText}>
                  <strong>Official Email</strong>
                  <span>
                    <a href="mailto:reservation@amabzerentals.com">reservation@amabzerentals.com</a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Multi-Step Interactive Form ── */}
          <div className={styles.formCard}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className={styles.successState}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className={styles.successIcon}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h3>Request Successfully Received</h3>
                  <div className={styles.successBadge}>
                    <span>Booking Reference: <strong>{referenceId || 'AMB-2026-84920'}</strong></span>
                  </div>
                  <p className={styles.successMainText}>
                    Thank you, <strong>{form.name || 'Valued Client'}</strong>. Your request has been registered in our centralized dispatch system.
                  </p>

                  <div className={styles.successNotificationBox}>
                    <div className={styles.notificationItem}>
                      <span className={styles.notifDot} />
                      <span>Request Dispatched to Amabze Desk: <code>reservation@amabzerentals.com</code></span>
                    </div>
                    <div className={styles.notificationItem}>
                      <span className={styles.notifDot} />
                      <span>Confirmation & Estimate Logged for: <code>{form.email || 'your email'}</code></span>
                    </div>
                    <div className={styles.slaBadgeHighlight}>
                      <Clock size={16} className={styles.slaIcon} />
                      <div>
                        <strong>Our team is actively working on your request and will update you within 2–3 hours.</strong>
                        <p>If you do not receive an update within 24 hours, or have an urgent query, please call our 24/7 desk directly at <strong>0124 4974856</strong> / <strong>+91 7982265845</strong>.</p>
                      </div>
                    </div>
                  </div>

                  {/* PDF Download & Quick WhatsApp Dispatch */}
                  <div className={styles.successActionButtons}>
                    <button
                      type="button"
                      className={styles.btnPdfDownload}
                      onClick={() => generateQuotePDF({ ...form, reference_id: referenceId, referenceId })}
                    >
                      <Download size={15} />
                      <span>Download Official PDF Quote</span>
                    </button>

                    <a
                      href={`https://wa.me/917982265845?text=${encodeURIComponent(
                        `Hello Amabze Desk, I have submitted booking request ref ${referenceId || 'AMB'}.\nName: ${form.name}\nCompany: ${form.company}\nRoute: ${form.pickup} to ${form.destination}\nDate: ${form.date}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnWhatsAppShare}
                    >
                      <MessageCircle size={15} />
                      <span>Send to WhatsApp Desk</span>
                    </a>
                  </div>

                  <div className={styles.urgentHelpRow}>
                    <span>Need immediate same-day dispatch?</span>
                    <a href="tel:01244974856" className={styles.urgentCallBtn}>
                      <Phone size={13} />
                      <span>Call 0124 4974856</span>
                    </a>
                  </div>

                  <button type="button" className={styles.btnReset} onClick={handleReset}>
                    <RotateCcw size={14} />
                    <span>Submit Another Request</span>
                  </button>
                </motion.div>
              ) : (
                <div key={`form-${step}`}>
                  {/* Step Progress Bar */}
                  <div className={styles.stepsHeader}>
                    <div className={styles.stepCounter}>
                      Step {step} of {TOTAL_STEPS} — {stepTitles[step - 1]}
                    </div>
                    <div className={styles.progressTrack}>
                      <div className={styles.progressFill} style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
                    </div>
                  </div>

                  <div className={styles.stepContent}>
                    <h3>{stepTitles[step - 1]}</h3>
                    <p>{stepDescriptions[step - 1]}</p>

                    {/* Step 1: Service Category Selector */}
                    {step === 1 && (
                      <div className={styles.serviceGridOptions}>
                        {SERVICE_TYPES.map((service) => {
                          const IconComp = service.icon;
                          const isSelected = form.serviceType === service.id;
                          return (
                            <div
                              key={service.id}
                              className={`${styles.serviceOptionCard} ${isSelected ? styles.selected : ''}`}
                              onClick={() => update('serviceType', service.id)}
                            >
                              <div className={styles.optionHeader}>
                                <div className={styles.optionIconBox}>
                                  <IconComp size={18} />
                                </div>
                                <span className={styles.optionTag}>{service.tag}</span>
                              </div>
                              <span className={styles.optionTitle}>{service.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Step 2: Route Details */}
                    {step === 2 && (
                      <div className={styles.fieldSection}>
                        <div className={styles.fieldGroup}>
                          <label htmlFor="pickup">
                            Pickup Address / City <span className={styles.required}>*</span>
                          </label>
                          <input
                            id="pickup"
                            type="text"
                            placeholder="e.g. Sector 29 Gurugram / Cyber City / IGI Airport T3"
                            value={form.pickup}
                            onChange={(e) => update('pickup', e.target.value)}
                            className={errors.pickup ? styles.error : ''}
                          />
                          {errors.pickup && <span className={styles.errorText}>{errors.pickup}</span>}
                        </div>

                        <div className={styles.fieldGroup}>
                          <label htmlFor="destination">Destination / Drop Location</label>
                          <input
                            id="destination"
                            type="text"
                            placeholder="e.g. Connaught Place Delhi / Mumbai Hub / Local Daily Route"
                            value={form.destination}
                            onChange={(e) => update('destination', e.target.value)}
                          />
                        </div>

                        <div className={styles.fieldRow}>
                          <div className={styles.fieldGroup}>
                            <label htmlFor="date">
                              Required Date <span className={styles.required}>*</span>
                            </label>
                            <input
                              id="date"
                              type="date"
                              value={form.date}
                              onChange={(e) => update('date', e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              className={errors.date ? styles.error : ''}
                            />
                            {errors.date && <span className={styles.errorText}>{errors.date}</span>}
                          </div>

                          <div className={styles.fieldGroup}>
                            <label htmlFor="passengers">Passengers</label>
                            <select
                              id="passengers"
                              value={form.passengers}
                              onChange={(e) => update('passengers', e.target.value)}
                            >
                              <option value="1-4">1 – 4 Passengers (Sedan / Luxury)</option>
                              <option value="5-7">5 – 7 Passengers (Innova Crysta / SUV)</option>
                              <option value="8-15">8 – 15 Passengers (Tempo Traveller)</option>
                              <option value="16-30">16 – 30 Passengers (Commuter Bus)</option>
                              <option value="30+">30+ Passengers (Volvo Luxury Coach)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Corporate Details */}
                    {step === 3 && (
                      <div className={styles.fieldSection}>
                        <div className={styles.fieldRow}>
                          <div className={styles.fieldGroup}>
                            <label htmlFor="name">
                              Full Name <span className={styles.required}>*</span>
                            </label>
                            <input
                              id="name"
                              type="text"
                              placeholder="e.g. Pravin Kumar"
                              value={form.name}
                              onChange={(e) => update('name', e.target.value)}
                              className={errors.name ? styles.error : ''}
                            />
                            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                          </div>

                          <div className={styles.fieldGroup}>
                            <label htmlFor="company">Organization / Company</label>
                            <input
                              id="company"
                              type="text"
                              placeholder="e.g. Samsung / Corporate Admin Desk"
                              value={form.company}
                              onChange={(e) => update('company', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className={styles.fieldRow}>
                          <div className={styles.fieldGroup}>
                            <label htmlFor="email">
                              Official Email <span className={styles.required}>*</span>
                            </label>
                            <input
                              id="email"
                              type="email"
                              placeholder="admin@company.com"
                              value={form.email}
                              onChange={(e) => update('email', e.target.value)}
                              className={errors.email ? styles.error : ''}
                            />
                            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                          </div>

                          <div className={styles.fieldGroup}>
                            <label htmlFor="formphone">
                              Phone Number <span className={styles.required}>*</span>
                            </label>
                            <input
                              id="formphone"
                              type="tel"
                              placeholder="+91 98765 43210"
                              value={form.phone}
                              onChange={(e) => update('phone', e.target.value)}
                              className={errors.phone ? styles.error : ''}
                            />
                            {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                          </div>
                        </div>

                        <div className={styles.fieldGroup}>
                          <label htmlFor="notes">Fleet Preferences & Custom Notes</label>
                          <textarea
                            id="notes"
                            rows={3}
                            placeholder="Specify vehicle models, GST requirements, flight numbers, or special instructions..."
                            value={form.notes}
                            onChange={(e) => update('notes', e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {submitError && (
                    <div className={styles.submitError}>
                      <AlertCircle size={16} />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className={styles.formActions}>
                    {step > 1 ? (
                      <button type="button" className={styles.btnBack} onClick={handleBack}>
                        <ArrowLeft size={15} />
                        <span>Back</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < TOTAL_STEPS ? (
                      <button
                        type="button"
                        className={styles.btnNext}
                        onClick={handleNext}
                        disabled={!canProceed}
                      >
                        <span>Continue to Route</span>
                        <ArrowRight size={15} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={styles.btnSubmit}
                        onClick={handleSubmit}
                        disabled={!canProceed || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className={styles.spinner} />
                            <span>Generating Proposal...</span>
                          </>
                        ) : (
                          <>
                            <span>Request Official Proposal</span>
                            <ShieldCheck size={16} />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}