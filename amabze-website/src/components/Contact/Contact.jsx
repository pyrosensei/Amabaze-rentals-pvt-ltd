import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
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
} from 'lucide-react';
import styles from './Contact.module.css';

const SERVICE_TYPES = [
  { id: 'corporate-commute', label: 'Corporate Employee Transport' },
  { id: 'chauffeur-transfer', label: 'Executive Chauffeur Transfer' },
  { id: 'airport-transfer', label: 'Airport Pickup / Drop-off' },
  { id: 'outstation', label: 'Outstation / Intercity Trip' },
  { id: 'event-logistics', label: 'Event & Conference Logistics' },
  { id: 'monthly-rental', label: 'Monthly Vehicle Rental' },
];

const TOTAL_STEPS = 3;

const stepTitles = ['Service Type', 'Route Details', 'Your Details'];
const stepDescriptions = [
  'What type of transportation do you require?',
  'Provide trip details so we can prepare your proposal.',
  'How should our travel desk reach you with the proposal?',
];

export default function Contact() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.15, rootMargin: '0px 0px -100px 0px' });
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    serviceType: '',
    pickup: '',
    destination: '',
    date: '',
    passengers: '',
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: '',
  });

  const update = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setStep(1);
    setSubmitted(false);
    setErrors({});
    setForm({
      serviceType: '',
      pickup: '',
      destination: '',
      date: '',
      passengers: '',
      name: '',
      company: '',
      email: '',
      phone: '',
      notes: '',
    });
  };

  const progress = (step / TOTAL_STEPS) * 100;

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
        <motion.div
          className={styles.grid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delay: 0.2 }}
        >
          {/* ── Left: Company contact info ── */}
          <motion.div className={styles.info}>
            <span className={styles.eyebrow}>CONNECT WITH US</span>
            <h2>Let's Plan Your Next Journey</h2>
            <p>
              Contact Amabze Rentals for corporate transportation, fleet
              leasing, employee commute solutions, airport transfers, and event
              logistics across India.
            </p>

            <div className={styles.contactMethods}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <MapPin size={18} />
                </div>
                <div className={styles.contactText}>
                  <strong>Head Office</strong>
                  <span>
                    No-S 4, Leisure Valley Park, Huda Market, Sector-29,
                    <br />
                    Opp. Kingdom of Dreams, Gurugram, Haryana - 122002
                  </span>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <Phone size={18} />
                </div>
                <div className={styles.contactText}>
                  <strong>Phone</strong>
                  <span>
                    <a href="tel:+917982265845">+91 7982 265 845</a>
                    <br />
                    <a href="tel:+918826716382">+91 8826 716 382</a>
                    <br />
                    <a href="tel:01244974856">0124 497 4856</a>
                  </span>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <Mail size={18} />
                </div>
                <div className={styles.contactText}>
                  <strong>Email</strong>
                  <span>
                    <a href="mailto:reservation@amabzerentals.com">
                      reservation@amabzerentals.com
                    </a>
                  </span>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <Globe size={18} />
                </div>
                <div className={styles.contactText}>
                  <strong>Website</strong>
                  <span>www.amabzerentals.com</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Multi-step form ── */}
          <motion.div className={styles.formCard}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className={styles.successState}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <motion.div
                    className={styles.successIcon}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  >
                    <CheckCircle2 size={28} />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Quote Request Received
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Thank you. Our travel desk will review your requirements and
                    respond within 2 business hours.
                  </motion.p>
                  <motion.button
                    type="button"
                    className={styles.btnReset}
                    onClick={handleReset}
                    whileHover={{ scale: 1.02, backgroundColor: 'var(--color-brand-50)' }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <RotateCcw size={14} />
                    Submit Another Request
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key={`form-${step}`}
                  initial={{ opacity: 0, x: step > 1 ? 50 : -50, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: step < 3 ? -50 : 50, y: -20 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20, duration: 0.4 }}
                >
                  {/* Step Progress Indicator */}
                  <motion.div className={styles.steps}>
                    <motion.div
                      className={styles.progressTrack}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: progress / 100 }}
                      transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'left center' }}
                    >
                      <div className={styles.progressFill} />
                    </motion.div>
                    {[1, 2, 3].map((s) => (
                      <motion.div
                        key={s}
                        className={`${styles.stepDot} ${
                          s === step ? styles.active : ''
                        } ${s < step ? styles.completed : ''}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.05 * s, type: 'spring', stiffness: 200, damping: 15 }}
                      >
                        {s < step && <CheckCircle2 size={12} className={styles.checkIcon} />}
                      </motion.div>
                    ))}
                    <motion.span
                      className={styles.stepLabel}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Step {step} of {TOTAL_STEPS} — {stepTitles[step - 1]}
                    </motion.span>
                  </motion.div>

                  {/* Step Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      className={styles.stepContent}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.h3
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {stepTitles[step - 1]}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        {stepDescriptions[step - 1]}
                      </motion.p>

                      {/* Step 1: Service Type */}
                      {step === 1 && (
                        <motion.div
                          className={styles.radioGroup}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ staggerChildren: 0.05, delay: 0.2 }}
                        >
                          {SERVICE_TYPES.map((service) => (
                            <motion.label
                              key={service.id}
                              className={`${styles.radioOption} ${
                                form.serviceType === service.id
                                  ? styles.selected
                                  : ''
                              }`}
                              whileHover={{ 
                                borderColor: form.serviceType === service.id 
                                  ? 'var(--color-brand-600)' 
                                  : 'var(--color-brand-300)',
                                backgroundColor: form.serviceType === service.id
                                  ? 'var(--color-brand-50)'
                                  : 'var(--color-brand-50)'
                              }}
                            >
                              <motion.input
                                type="radio"
                                name="serviceType"
                                value={service.id}
                                checked={form.serviceType === service.id}
                                onChange={() => update('serviceType', service.id)}
                                className={styles.radioInput}
                              />
                              <motion.span
                                className={styles.radioLabel}
                                initial={{ x: -10 }}
                                animate={{ x: 0 }}
                              >
                                {service.label}
                              </motion.span>
                              <motion.div
                                className={styles.radioIndicator}
                                initial={{ scale: 0 }}
                                animate={{ scale: form.serviceType === service.id ? 1 : 0 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                              />
                            </motion.label>
                          ))}
                        </motion.div>
                      )}

                      {/* Step 2: Route Details */}
                      {step === 2 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ staggerChildren: 0.05, delay: 0.2 }}
                        >
                          <motion.div className={styles.fieldGroup}>
                            <label htmlFor="pickup" className={styles.fieldLabel}>
                              Pickup Location <span className={styles.required}>*</span>
                            </label>
                            <motion.input
                              id="pickup"
                              type="text"
                              placeholder="e.g. Cyber City, Gurugram"
                              value={form.pickup}
                              onChange={(e) => update('pickup', e.target.value)}
                              className={`${styles.fieldInput} ${errors.pickup ? styles.error : ''}`}
                            />
                            {errors.pickup && (
                              <motion.p
                                className={styles.errorMessage}
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                              >
                                <AlertCircle size={12} /> {errors.pickup}
                              </motion.p>
                            )}
                          </motion.div>

                          <motion.div className={styles.fieldGroup}>
                            <label htmlFor="destination" className={styles.fieldLabel}>
                              Destination (if applicable)
                            </label>
                            <motion.input
                              id="destination"
                              type="text"
                              placeholder="e.g. IGI Airport Terminal 3"
                              value={form.destination}
                              onChange={(e) => update('destination', e.target.value)}
                              className={styles.fieldInput}
                            />
                          </motion.div>

                          <motion.div className={styles.fieldRow}>
                            <motion.div className={styles.fieldGroup}>
                              <label htmlFor="date" className={styles.fieldLabel}>
                                Preferred Date <span className={styles.required}>*</span>
                              </label>
                              <motion.input
                                id="date"
                                type="date"
                                value={form.date}
                                onChange={(e) => update('date', e.target.value)}
                                className={`${styles.fieldInput} ${errors.date ? styles.error : ''}`}
                                min={new Date().toISOString().split('T')[0]}
                              />
                              {errors.date && (
                                <motion.p
                                  className={styles.errorMessage}
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  <AlertCircle size={12} /> {errors.date}
                                </motion.p>
                              )}
                            </motion.div>

                            <motion.div className={styles.fieldGroup}>
                              <label htmlFor="passengers" className={styles.fieldLabel}>
                                Estimated Passengers
                              </label>
                              <motion.select
                                id="passengers"
                                value={form.passengers}
                                onChange={(e) => update('passengers', e.target.value)}
                                className={styles.fieldInput}
                              >
                                <option value="">Select</option>
                                <option value="1-4">1 – 4</option>
                                <option value="5-7">5 – 7</option>
                                <option value="8-15">8 – 15</option>
                                <option value="16-30">16 – 30</option>
                                <option value="30+">30+</option>
                              </motion.select>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Step 3: Contact Info */}
                      {step === 3 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ staggerChildren: 0.05, delay: 0.2 }}
                        >
                          <motion.div className={styles.fieldRow}>
                            <motion.div className={styles.fieldGroup}>
                              <label htmlFor="name" className={styles.fieldLabel}>
                                Full Name <span className={styles.required}>*</span>
                              </label>
                              <motion.input
                                id="name"
                                type="text"
                                placeholder="Your name"
                                value={form.name}
                                onChange={(e) => update('name', e.target.value)}
                                className={`${styles.fieldInput} ${errors.name ? styles.error : ''}`}
                              />
                              {errors.name && (
                                <motion.p
                                  className={styles.errorMessage}
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  <AlertCircle size={12} /> {errors.name}
                                </motion.p>
                              )}
                            </motion.div>

                            <motion.div className={styles.fieldGroup}>
                              <label htmlFor="company" className={styles.fieldLabel}>
                                Company Name
                              </label>
                              <motion.input
                                id="company"
                                type="text"
                                placeholder="Organization (optional)"
                                value={form.company}
                                onChange={(e) => update('company', e.target.value)}
                                className={styles.fieldInput}
                              />
                            </motion.div>
                          </motion.div>

                          <motion.div className={styles.fieldRow}>
                            <motion.div className={styles.fieldGroup}>
                              <label htmlFor="email" className={styles.fieldLabel}>
                                Email <span className={styles.required}>*</span>
                              </label>
                              <motion.input
                                id="email"
                                type="email"
                                placeholder="you@company.com"
                                value={form.email}
                                onChange={(e) => update('email', e.target.value)}
                                className={`${styles.fieldInput} ${errors.email ? styles.error : ''}`}
                              />
                              {errors.email && (
                                <motion.p
                                  className={styles.errorMessage}
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  <AlertCircle size={12} /> {errors.email}
                                </motion.p>
                              )}
                            </motion.div>

                            <motion.div className={styles.fieldGroup}>
                              <label htmlFor="formphone" className={styles.fieldLabel}>
                                Phone <span className={styles.required}>*</span>
                              </label>
                              <motion.input
                                id="formphone"
                                type="tel"
                                placeholder="+91 XXXXX XXXXX"
                                value={form.phone}
                                onChange={(e) => update('phone', e.target.value)}
                                className={`${styles.fieldInput} ${errors.phone ? styles.error : ''}`}
                              />
                              {errors.phone && (
                                <motion.p
                                  className={styles.errorMessage}
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  <AlertCircle size={12} /> {errors.phone}
                                </motion.p>
                              )}
                            </motion.div>
                          </motion.div>

                          <motion.div className={styles.fieldGroup}>
                            <label htmlFor="notes" className={styles.fieldLabel}>
                              Additional Notes
                            </label>
                            <motion.textarea
                              id="notes"
                              placeholder="Any specific requirements, fleet preferences, or questions..."
                              value={form.notes}
                              onChange={(e) => update('notes', e.target.value)}
                              className={styles.fieldInput}
                            />
                          </motion.div>
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  <motion.div
                    className={styles.formActions}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {step > 1 ? (
                      <motion.button
                        type="button"
                        className={styles.btnBack}
                        onClick={handleBack}
                        whileHover={{ x: -4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ArrowLeft size={14} />
                        Back
                      </motion.button>
                    ) : (
                      <motion.div className={styles.spacer} />
                    )}

                    <AnimatePresence mode="wait">
                      {step < TOTAL_STEPS ? (
                        <motion.button
                          key="next"
                          type="button"
                          className={styles.btnNext}
                          onClick={handleNext}
                          disabled={!canProceed}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        >
                          Continue
                          <ArrowRight size={14} />
                        </motion.button>
                      ) : (
                        <motion.button
                          key="submit"
                          type="button"
                          className={styles.btnSubmit}
                          onClick={handleSubmit}
                          disabled={!canProceed || isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 size={14} className={styles.spinner} />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit Request
                              <ArrowRight size={14} />
                            </>
                          )}
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}