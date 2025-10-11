import { motion } from 'motion/react';
import { standarAnimationProps } from './types/animationTypes';

const List = {
  show: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 100 },
};

const item = {
  show: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: index * 0.3 },
  }),
  hidden: { opacity: 0, x: -100 },
};

export default function AnimateParentLeftEffect({
  children,
  ...props
}: standarAnimationProps) {
  return (
    <motion.div variants={List} initial="hidden" animate="show" {...props}>
      {children}
    </motion.div>
  );
}

export function AnimateChildLeftEffect({
  children,
  duration = 0,
  ...props
}: standarAnimationProps) {
  return (
    <motion.div variants={item} custom={duration} {...props}>
      {children}
    </motion.div>
  );
}
