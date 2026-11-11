'use client';

import { useSyncExternalStore } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

function subscribe(onChange: () => void) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotion.addEventListener('change', onChange);
  document.addEventListener('visibilitychange', onChange);

  return () => {
    reducedMotion.removeEventListener('change', onChange);
    document.removeEventListener('visibilitychange', onChange);
  };
}

function canAnimate() {
  return (
    !document.hidden &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 24,
    mass: 0.8,
  });
  const firstX = useTransform(progress, [0, 0.5, 1], ['-8%', '8%', '-4%']);
  const firstY = useTransform(progress, [0, 0.5, 1], ['-5%', '7%', '-3%']);
  const secondX = useTransform(progress, [0, 0.5, 1], ['7%', '-8%', '5%']);
  const secondY = useTransform(progress, [0, 0.5, 1], ['5%', '-6%', '7%']);
  const firstOpacity = useTransform(
    progress,
    [0, 0.35, 0.7, 1],
    [0.4, 0.65, 0.35, 0.6]
  );
  const secondOpacity = useTransform(
    progress,
    [0, 0.35, 0.7, 1],
    [0.55, 0.3, 0.6, 0.4]
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute -inset-[35%] bg-[radial-gradient(ellipse_at_32%_34%,#c5e9f8_0%,transparent_53%)]"
        style={{ x: firstX, y: firstY, opacity: firstOpacity }}
      />
      <motion.div
        className="absolute -inset-[35%] bg-[radial-gradient(ellipse_at_70%_68%,#d2e6fa_0%,transparent_54%)]"
        style={{ x: secondX, y: secondY, opacity: secondOpacity }}
      />
    </div>
  );
}

export function ScrollBackground() {
  const enabled = useSyncExternalStore(subscribe, canAnimate, () => false);

  return enabled ? <AnimatedBackground /> : null;
}
