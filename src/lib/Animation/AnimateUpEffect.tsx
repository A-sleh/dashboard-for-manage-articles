import { motion } from 'motion/react';
import { standarAnimationProps } from './types/animationTypes';

export default function AnimateUpEffect({
  children,
  offsetValue = 40 ,
  duration,
  ...props
}: standarAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: offsetValue }}
      animate={{ opacity: 1, y: 0 }}
      exit={{opacity: 0 , y: 40}}
      transition={{ type: 'spring' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export  function AnimateUpInView({
  children,
  offsetValue = 40 ,
  duration,
  ...props
}: standarAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: offsetValue }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}