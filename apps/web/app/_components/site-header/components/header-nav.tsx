'use client';

import { useId, useState } from 'react';
import { motion, MotionConfig, useReducedMotion } from 'motion/react';
import { links } from '../constants/links';

export function HeaderNav() {
  const indicatorId = useId();
  const reduceMotion = useReducedMotion();
  const [activeHref, setActiveHref] = useState<string | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <nav
        aria-label="Основная навигация"
        className="group/nav pointer-events-auto isolate flex gap-1.5 text-[13px] font-medium max-[900px]:gap-1 max-[700px]:hidden"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onPointerEnter={(event) => {
              if (event.pointerType !== 'touch') setActiveHref(link.href);
            }}
            onFocus={() => {
              setActiveHref(link.href);
            }}
            className="relative rounded-lg px-2.5 py-2 text-[#36556a] transition-colors duration-300 ease-in-out group-data-compact/header:py-1.5 hover:text-[#174d71] focus-visible:text-[#174d71] motion-safe:transition-[color,padding]"
          >
            {link.label}
            {activeHref === link.href && (
              <motion.span
                aria-hidden="true"
                layoutId={indicatorId}
                transition={{
                  layout: { duration: 0.38, ease: [0.25, 0.8, 0.25, 1] },
                }}
                className="pointer-events-none absolute inset-0 -z-10"
              >
                <motion.span
                  animate={
                    reduceMotion === false
                      ? { scaleX: [1, 1.07, 1], scaleY: [1, 0.97, 1] }
                      : undefined
                  }
                  transition={{
                    duration: 0.42,
                    times: [0, 0.35, 1],
                    ease: 'easeInOut',
                  }}
                  className="block size-full rounded-full bg-radial-[at_32%_28%] from-[#e7f4fa] via-[#dcedf6] to-[#cce5f2] opacity-0 transition-opacity duration-700 ease-in-out group-focus-within/nav:opacity-100 group-focus-within/nav:duration-300 group-hover/nav:opacity-100 group-hover/nav:duration-300 motion-safe:scale-95 motion-safe:transition-[opacity,scale] motion-safe:group-focus-within/nav:scale-100 motion-safe:group-hover/nav:scale-100"
                />
              </motion.span>
            )}
          </a>
        ))}
      </nav>
    </MotionConfig>
  );
}
