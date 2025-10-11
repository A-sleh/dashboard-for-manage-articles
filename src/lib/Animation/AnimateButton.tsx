import { motion } from 'motion/react';
import { standarAnimationProps } from './types/animationTypes';
import AnimateScale from './AnimateScale';

export default function AnimateButton({
  children,
  scale = 0.9,
  withInitialScale = false,
  ...props
}: standarAnimationProps) {
  if (withInitialScale)
    return (
      <AnimateScale {...props}>
        <motion.button
          whileTap={{ scale }}
          exit={{ opacity: 0, y: 40 }}
          {...props}
        >
          {children}
        </motion.button>
      </AnimateScale>
    );
  return (
    <motion.button whileTap={{ scale }} {...props}>
      {children}
    </motion.button>
  );
}
