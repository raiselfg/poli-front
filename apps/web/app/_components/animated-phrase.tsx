'use client';

import type { ReactNode } from 'react';
import { motion, stagger, useReducedMotion, type Variants } from 'motion/react';
import { cn } from '@workspace/ui/lib/utils';

const effects = {
  color: { color: ['#482d56', '#08648f', '#08648f', '#482d56'] },
  underline: { backgroundSize: ['0% 3px', '100% 3px'] },
};

const descriptionEffects = {
  focus: {
    hidden: { filter: 'blur(6px)' },
    show: { filter: 'blur(0px)' },
  },
  wipe: {
    hidden: { clipPath: 'inset(-8% 100% -8% -4%)' },
    show: { clipPath: 'inset(-8% -4% -8% -4%)' },
  },
  soften: {
    hidden: { scale: 0.97 },
    show: { scale: 1 },
  },
} satisfies Record<string, Variants>;

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
  effect,
}: {
  children: ReactNode;
  className: string;
  effect: keyof typeof descriptionEffects;
}) {
  const reveal = descriptionEffects[effect];

  return (
    <motion.p
      variants={{
        hidden: { ...reveal.hidden, opacity: 0 },
        show: {
          ...reveal.show,
          opacity: 1,
          transition: {
            duration: 0.55,
            ease: 'easeOut',
            delayChildren: 0.59,
          },
        },
      }}
      className={cn(
        className,
        'origin-left motion-reduce:transform-none! motion-reduce:opacity-100! motion-reduce:filter-none! motion-reduce:[clip-path:none]!'
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
