/* Shared motion language for Amabze Rentals.
   Unified easing curves, lightweight spring transitions,
   and accessible reduced-motion support. */

export const EASE = [0.22, 1, 0.36, 1]; // Smooth Apple/Stripe-like cubic bezier
export const EASE_IN_OUT = [0.4, 0, 0.2, 1];
export const SPRING_GENTLE = { type: 'spring', stiffness: 260, damping: 24 };
export const SPRING_SNAPPY = { type: 'spring', stiffness: 380, damping: 28 };
export const spring = SPRING_GENTLE;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: EASE },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: EASE },
  },
};

export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

export const cardHover = {
  y: -5,
  transition: { duration: 0.2, ease: EASE },
};

export const viewportOnce = { once: true, margin: '-50px 0px' };
