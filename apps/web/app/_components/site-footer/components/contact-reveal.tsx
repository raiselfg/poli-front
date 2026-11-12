'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export function ContactReveal({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="min-w-0"
      initial={false}
      whileInView={
        reduceMotion === false ? { opacity: [0.65, 1], y: [14, 0] } : undefined
      }
      transition={{ duration: 0.65, ease: 'easeOut' }}
      viewport={{ once: true, amount: 'some' }}
    >
      {children}
    </motion.div>
  );
}
