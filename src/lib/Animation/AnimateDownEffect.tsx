"use client"

import { motion } from 'motion/react';
import { standarAnimationProps } from './types/animationTypes';

export default function AnimateDownEffect({
  children,
  offsetValue = -20,
  duration,
  ...props
}: standarAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: offsetValue }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring' ,duration}}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export  function AnimateDownEffectInview({
  children,
  offsetValue = -20,
  duration,
  ...props
}: standarAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: offsetValue }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring' ,duration}}
      {...props}
    >
      {children}
    </motion.div>
  );
}
