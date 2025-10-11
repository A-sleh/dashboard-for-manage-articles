import { motion } from 'motion/react';
import { standarAnimationProps } from './types/animationTypes';

const list = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0 },
};

const item = {
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: index * 0.1 },
  }),
  hidden: { opacity: 0, scale: 0 },
};

export default function AnimateParentScaleUp({
  children,
  ...props
}: standarAnimationProps) {
  return (
    <motion.div variants={list} initial="hidden" animate="visible" {...props}>
      {children}
    </motion.div>
  );
}

export function AnimateChildScaleUpChild({
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
