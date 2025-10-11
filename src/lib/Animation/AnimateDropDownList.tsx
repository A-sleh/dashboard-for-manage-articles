import { motion } from 'motion/react';
import { standarAnimationProps } from './types/animationTypes';

export default function AnimateDropDownList({
  children,
  ...props
}: standarAnimationProps) {
  return (
    <motion.div
      layout
      exit={{ height: 0 }}
      transition={{ type: 'spring', bounce: 0.5, duration: 0.4 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
