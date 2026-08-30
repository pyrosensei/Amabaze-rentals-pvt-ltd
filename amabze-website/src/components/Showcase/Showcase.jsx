import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Showcase.module.css';

import dzireImg from '../../assets/dzire.jpg';
import corporateSedanImg from '../../assets/corporate-sedan.jpg';
import innovaImg from '../../assets/innova.jpg';
import touristBusImg from '../../assets/tourist-bus.jpg';
import coachImg from '../../assets/coach.jpg';
import coachInteriorImg from '../../assets/coach-interior.png';
import showcase1Img from '../../assets/showcase-1.jpg';
import showcase2Img from '../../assets/showcase-2.jpg';

const SLIDES = [
  { id: 'sedans', image: dzireImg, caption: 'Executive Sedans' },
  { id: 'corporate', image: corporateSedanImg, caption: 'Corporate Sedans' },
  { id: 'suvs', image: innovaImg, caption: 'Premium SUVs & MUVs' },
  { id: 'travellers', image: touristBusImg, caption: 'Travellers & Buses' },
  { id: 'coaches', image: coachImg, caption: 'Luxury Coaches' },
  { id: 'interiors', image: coachInteriorImg, caption: 'Coach Interiors' },
  { id: 'premium', image: showcase1Img, caption: 'Chauffeur-Driven Service' },
  { id: 'standard', image: showcase2Img, caption: 'Premium Fleet Standard' },
];

const AUTO_ADVANCE_MS = 4500;

const Showcase = () => {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const timerRef = useRef(null);

  const paused = hovered || focused;

  const goTo = useCallback((nextIndex) => {
    setIndex((nextIndex + SLIDES.length) % SLIDES.length);
  }, []);

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  const scrollToFleet = useCallback(() => {
    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    timerRef.current = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, goNext]);

  const handleFocusOut = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  };

  const slide = SLIDES[index];

  return (
    <section className={styles.showcaseSection} aria-label="Fleet showcase">
      <div className={styles.container}>
        <motion.div
          className={styles.showcaseHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className={styles.eyebrow}>FLEET IN MOTION</span>
          <h2 className={styles.heading}>Take a Look Inside the Fleet</h2>
          <p className={styles.subtitle}>
            Every vehicle in our fleet is GPS-tracked, insured, and maintained to the highest standard.
          </p>
        </motion.div>

        <div
          className={styles.carousel}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={handleFocusOut}
          onKeyDown={handleKeyDown}
          role="region"
          aria-roledescription="carousel"
          aria-label="Fleet vehicles"
        >
          <div className={styles.viewport} aria-live="polite">
            <AnimatePresence initial={false}>
              <motion.button
                key={slide.id}
                type="button"
                className={styles.slide}
                onClick={scrollToFleet}
                aria-label={`View ${slide.caption} in the fleet`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: 'easeInOut' }}
              >
                <img
                  src={slide.image}
                  alt={slide.caption}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className={styles.slideImage}
                />
                <span className={styles.caption}>{slide.caption}</span>
              </motion.button>
            </AnimatePresence>

            {/* Auto-advance progress */}
            {!paused && (
              <motion.div
                key={`progress-${index}`}
                className={styles.progressBar}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
              />
            )}
          </div>

          <button
            type="button"
            className={styles.navButton}
            onClick={goPrev}
            aria-label="Previous vehicle"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={goNext}
            aria-label="Next vehicle"
          >
            <ChevronRight size={22} />
          </button>

          {/* Dots — mobile */}
          <div className={styles.dots} aria-label="Choose vehicle">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Show ${s.caption}`}
                aria-current={i === index}
                className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          {/* Thumbnails — desktop */}
          <div className={styles.thumbs} aria-label="Choose vehicle">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Show ${s.caption}`}
                aria-current={i === index}
                className={`${styles.thumb} ${i === index ? styles.thumbActive : ''}`}
                onClick={() => goTo(i)}
              >
                <img src={s.image} alt="" loading="lazy" className={styles.thumbImage} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;