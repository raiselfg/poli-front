'use client';

import type { ReactNode } from 'react';
import { motion, stagger, useReducedMotion, type Variants } from 'motion/react';
import { cn } from '@workspace/ui/lib/utils';

const effects = {
  color: { color: ['#482d56', '#08648f', '#08648f', '#482d56'] },
  underline: { backgroundSize: ['0% 3px', '100% 3px'] },
};

const descriptionReveal: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
      delayChildren: 0.59,
    },
  },
};

export function AnimatedCopy({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView={reducedMotion === false ? 'show' : undefined}
      viewport={{ once: true, amount: 0.65, margin: '0px 0px -36px 0px' }}
      variants={{ show: { transition: { delayChildren: stagger(1.15) } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedDescription({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <motion.p
      variants={descriptionReveal}
      className={cn(
        className,
        'motion-reduce:transform-none! motion-reduce:opacity-100!'
      )}
    >
      {children}
    </motion.p>
  );
}

export function AnimatedPhrase({
  children,
  className,
  effect,
}: {
  children: ReactNode;
  className: string;
  effect: keyof typeof effects;
}) {
  return (
    <motion.strong
      variants={{ show: effects[effect] }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className={cn(
        className,
        effect === 'underline' &&
          'bg-linear-to-r from-[#4381ad] to-[#805a9d] box-decoration-clone bg-size-[0%_3px] bg-bottom-left bg-no-repeat'
      )}
    >
      {children}
    </motion.strong>
  );
}
