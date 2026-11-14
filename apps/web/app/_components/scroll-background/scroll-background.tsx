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

export function ScrollBackground() {
  const enabled = useSyncExternalStore(subscribe, canAnimate, () => false);
  const { scrollY, scrollYProgress } = useScroll();
  const backgroundProgress = useTransform(() => {
    if (!enabled) return 0;

    // Ease in from the top while keeping the hero responsive on long pages.
    const initialProgress = 1 - Math.exp(-Math.max(0, scrollY.get()) / 180);
    return initialProgress ** 2 * 0.52 + scrollYProgress.get() * 0.48;
  });
  const progress = useSpring(backgroundProgress, {
    stiffness: 90,
    damping: 19,
    mass: 0.8,
  });
  const stops = [0, 0.35, 0.64, 0.76, 0.88, 1];
  // With -35% insets, a shift of 20% keeps both horizontal edges offscreen.
  const firstX = useTransform(progress, stops, [
    '-16%',
    '20%',
    '-14%',
    '20%',
    '-13%',
    '18%',
  ]);
  const firstY = useTransform(progress, stops, [
    '-9%',
    '15%',
    '-9%',
    '12%',
    '-10%',
    '14%',
  ]);
  const secondX = useTransform(progress, stops, [
    '16%',
    '-20%',
    '15%',
    '-19%',
    '14%',
    '-18%',
  ]);
  const secondY = useTransform(progress, stops, [
    '10%',
    '-14%',
    '15%',
    '-12%',
    '14%',
    '-11%',
  ]);
  const firstOpacity = useTransform(
    progress,
    stops,
    [0.42, 0.98, 0.32, 0.94, 0.34, 0.9]
  );
  const secondOpacity = useTransform(
    progress,
    stops,
    [0.96, 0.26, 0.95, 0.34, 0.96, 0.4]
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden motion-reduce:hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute -inset-[35%] bg-[radial-gradient(ellipse_at_32%_34%,#53b9ed_0%,#9cdcf7_21%,#d9f1fb_38%,transparent_60%)]"
        style={{ x: firstX, y: firstY, opacity: firstOpacity }}
      />
      <motion.div
        className="absolute -inset-[35%] bg-[radial-gradient(ellipse_at_70%_68%,#829ff1_0%,#b2ccfa_22%,#e1ebfc_39%,transparent_60%)]"
        style={{ x: secondX, y: secondY, opacity: secondOpacity }}
      />
    </div>
  );
}
