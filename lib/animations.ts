import { Variants } from "framer-motion";

// Fade up animation
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

// Stagger children animations
export const stagger: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Scale animation
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
  hover: {
    scale: 1.03,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }
};

// Page transition
export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};