import { motion } from 'motion/react';
import { standarAnimationProps } from './types/animationTypes';

export default function AnimateFromToRight({
  children,
  duration,
  offsetValue = -100,
  run = true,
  delay,
  ...props
}: standarAnimationProps) {
  // if the animation are stoped
  if (!run) return <div {...props}> {children} </div>;

  return (
    <motion.div
      initial={{ opacity: 0, x: offsetValue }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimateFromToRightInView({
  children,
  duration,
  offsetValue = -100,
  delay,
  ...props
}: standarAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: offsetValue }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
