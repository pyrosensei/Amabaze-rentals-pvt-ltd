import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import styles from './Showcase.module.css';

import dzireImg from '../../assets/dzire.jpg';
import corporateSedanImg from '../../assets/corporate-sedan.jpg';
import innovaImg from '../../assets/innova.jpg';
import touristBusImg from '../../assets/images/executive_urbania_bus_1788075709816.jpg';
import coachImg from '../../assets/images/coach_luxury_bus_1788075692477.jpg';
import coachInteriorImg from '../../assets/coach-interior.png';
import showcase1Img from '../../assets/showcase-1.jpg';
import showcase2Img from '../../assets/showcase-2.jpg';

const SLIDES = [
  {
    id: 'sedans',
    image: dzireImg,
    caption: 'Executive & Business Sedans',
    tag: 'Daily Corporate Transit',
    description: 'Dzire, Etios, Honda City, Ciaz with verified chauffeurs & live GPS.',
  },
  {
    id: 'corporate',
    image: corporateSedanImg,
    caption: 'Premium Corporate Sedans',
    tag: 'Executive Airport Transfers',
    description: 'Immaculately detailed executive saloons for business meetings.',
  },
  {
    id: 'suvs',
    image: innovaImg,
    caption: 'Premium SUVs & MUVs',
    tag: 'VIP & Senior Leadership',
    description: 'Innova Crysta, Hycross & Fortuner with reclining captain chairs.',
  },
  {
    id: 'travellers',
    image: touristBusImg,
    caption: 'Executive Travellers & Mini-Buses',
    tag: 'Group Commute & Offsites',
    description: 'Force Urbania & 12-26 Seater Tempo Travellers with dual AC.',
  },
  {
    id: 'coaches',
    image: coachImg,
    caption: 'Luxury Multi-Axle Volvo Coaches',
    tag: 'Conferences & Delegations',
    description: 'Volvo 9400 / 9600 coaches with electronically controlled air suspension.',
  },
  {
    id: 'interiors',
    image: coachInteriorImg,
    caption: 'Ergonomic Luxury Coach Interiors',
    tag: 'First-Class Comfort',
    description: 'Plush reclining seats, climate louvers, and individual reading lamps.',
  },
  {
    id: 'premium',
    image: showcase1Img,
    caption: 'Verified Chauffeur-Driven Service',
    tag: 'SLA Guaranteed',
    description: 'Professional uniformed chauffeurs with background checks.',
  },
  {
    id: 'standard',
    image: showcase2Img,
    caption: 'Pan-India Fleet Deployment',
    tag: '100% Compliant',
    description: 'Commercial permits, comprehensive passenger insurance & GST billing.',
  },
];

const AUTO_ADVANCE_MS = 5000;

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.35 },
      scale: { duration: 0.4 },
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.96,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 },
    },
  }),
};

const Showcase = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const activeIndex = (page % SLIDES.length + SLIDES.length) % SLIDES.length;

  const paginate = useCallback((newDirection) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  const goToSlide = useCallback((targetIndex) => {
    setPage(([prevPage]) => {
      const current = (prevPage % SLIDES.length + SLIDES.length) % SLIDES.length;
      const diff = targetIndex - current;
      return [prevPage + diff, diff >= 0 ? 1 : -1];
    });
  }, []);

  // Auto advance
  useEffect(() => {
    if (isHovered) return undefined;
    timerRef.current = setInterval(() => {
      paginate(1);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timerRef.current);
  }, [isHovered, paginate]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') paginate(-1);
    if (e.key === 'ArrowRight') paginate(1);
  };

  const currentSlide = SLIDES[activeIndex];

  return (
    <section className={styles.showcaseSection} id="showcase" aria-label="Fleet showcase">
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.showcaseHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.eyebrow}>
            <Sparkles size={14} />
            <span>FLEET IN MOTION</span>
          </div>
          <h2 className={styles.heading}>Experience the Fleet Standards</h2>
          <p className={styles.subtitle}>
            Explore our verified commercial fleet, impeccably sanitized and equipped with real-time telematics for enterprise reliability across India.
          </p>
        </motion.div>

        {/* Carousel Slider Window */}
        <div
          className={styles.sliderContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Amabze Fleet Gallery"
        >
          <div className={styles.sliderViewport}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={styles.slideCard}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (swipe < -50 || velocity.x < -300) {
                    paginate(1);
                  } else if (swipe > 50 || velocity.x > 300) {
                    paginate(-1);
                  }
                }}
              >
                <img
                  src={currentSlide.image}
                  alt={currentSlide.caption}
                  className={styles.slideImage}
                />
                <div className={styles.slideGradientOverlay} />

                {/* Caption Card */}
                <div className={styles.captionOverlay}>
                  <span className={styles.slideTag}>{currentSlide.tag}</span>
                  <h3 className={styles.slideTitle}>{currentSlide.caption}</h3>
                  <p className={styles.slideDescription}>{currentSlide.description}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Progress Bar */}
            {!isHovered && (
              <motion.div
                key={`progress-${activeIndex}`}
                className={styles.progressBar}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
              />
            )}

            {/* Nav Arrows */}
            <button
              type="button"
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={() => paginate(-1)}
              aria-label="Previous fleet slide"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={() => paginate(1)}
              aria-label="Next fleet slide"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className={styles.dotsRow} aria-label="Select slide">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                className={`${styles.dotBtn} ${idx === activeIndex ? styles.activeDot : ''}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${slide.caption}`}
              />
            ))}
          </div>

          {/* Thumbnail Track */}
          <div className={styles.thumbnailTrack} aria-label="Quick vehicle thumbnails">
            {SLIDES.map((slide, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  className={`${styles.thumbItem} ${isActive ? styles.thumbActive : ''}`}
                  onClick={() => goToSlide(idx)}
                  aria-label={`View ${slide.caption}`}
                >
                  <img src={slide.image} alt="" className={styles.thumbImg} loading="lazy" />
                  <span className={styles.thumbLabel}>{slide.caption}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
