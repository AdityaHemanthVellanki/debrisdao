"use client";

// Re-export specific named exports from framer-motion instead of using wildcard exports
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useAnimation,
  useInView,
  useMotionValue,
  useMotionTemplate,
  MotionConfig,
  LayoutGroup,
  useReducedMotion,
  useTime,
  useViewportScroll,
  transform,
  animate,
  usePresence,
  Variants,
  Transition,
  Reorder,
  useWillChange
} from 'framer-motion';

export {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useAnimation,
  useInView,
  useMotionValue,
  useMotionTemplate,
  MotionConfig,
  LayoutGroup,
  useReducedMotion,
  useTime,
  useViewportScroll,
  transform,
  animate,
  usePresence,
  Reorder,
  useWillChange
};

// Export types explicitly with 'export type'
export type { Variants, Transition };
