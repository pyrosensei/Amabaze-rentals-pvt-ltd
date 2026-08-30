/* Shared motion language for the whole site.
   One easing curve, one set of variants — this is what
   makes every animation feel like part of the same system. */

export const EASE = [0.25, 0.46, 0.45, 0.94];

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export const cardHover = {
  y: -4,
  transition: { duration: 0.25, ease: EASE },
};

export const viewportOnce = { once: true, margin: '-60px 0px' };

export const spring = { type: 'spring', stiffness: 400, damping: 30 };
