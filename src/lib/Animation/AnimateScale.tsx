import { motion } from 'motion/react';
import { standarAnimationProps } from './types/animationTypes';

export default function AnimateScale({
  children,
  scale = 0.7,
  run = true ,
  ...props
}: standarAnimationProps) {
  // if the animation are stoped
  if (!run) return <div {...props}> {children} </div>;  

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'tween' }}
      style={{scrollbarWidth: 'none'}}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimateScaleInview({
  children,
  scale = 0.7,
  ...props
}: standarAnimationProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
