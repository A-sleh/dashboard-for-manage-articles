import { motion } from 'motion/react';
import { standarAnimationProps } from './types/animationTypes';

export default function AnimateWidth({
  children,
  ...props
}: standarAnimationProps) {
  return (
    <motion.ul
      layout
      {...props}
    >
      {children}
    </motion.ul>
  );
}
