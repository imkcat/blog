'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ReactNode } from 'react';

/* ========================================
   Manga-Style Animation Variants
   漫画風アニメーション
   ======================================== */

// Basic fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

// Manga-specific: Punchy pop effect
export const mangaPop: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.2, 
      ease: [0.175, 0.885, 0.32, 1.275] // Bounce easing
    } 
  },
};

// Manga-specific: Shake effect for emphasis
export const mangaShake: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.1 }
  },
  shake: {
    x: [0, -3, 3, -2, 2, 0],
    transition: { duration: 0.3 }
  }
};

// Stagger animations for lists
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }
  },
};

/* ========================================
   Motion Components
   モーションコンポーネント
   ======================================== */

interface MotionContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className, delay = 0 }: MotionContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInUp({ children, className, delay = 0 }: MotionContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, className, delay = 0 }: MotionContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={scaleIn}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className }: MotionContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: MotionContainerProps) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

// Manga-style card with punchy hover
interface MangaCardProps {
  children: ReactNode;
  className?: string;
}

export function MangaCard({ children, className }: MangaCardProps) {
  return (
    <motion.div
      whileHover={{ 
        y: -3, 
        x: -3,
        transition: { duration: 0.1, ease: 'easeOut' } 
      }}
      whileTap={{ 
        scale: 0.98,
        y: 0,
        x: 0,
        transition: { duration: 0.05 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Export motion and AnimatePresence for direct use
export { motion, AnimatePresence };
