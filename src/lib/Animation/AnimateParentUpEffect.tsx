import { motion } from 'motion/react';
import { standarAnimationProps } from './types/animationTypes';

const List = {
  show: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 50 },
};

const item = {
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.3  },
  }),
  hidden: { opacity: 0, y: -30 },
};

export default function AnimateParentUpEffect({
  children,
  ...props
}: standarAnimationProps) {
  return (
    <motion.div variants={List}  initial="hidden" animate="show" {...props}>
      {children}
    </motion.div>
  );
}

export function AnimateChildUpEffect({
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
