'use client';

import { useState, type ReactNode } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';

export function StickyHeader({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);

  useMotionValueEvent(scrollY, 'change', (position) => {
    if (!compact && position >= 24) setCompact(true);
    if (compact && position <= 8) setCompact(false);
  });

  return (
    <div
      data-compact={compact || undefined}
      className="pointer-events-none sticky top-0 z-30 border-b border-transparent bg-transparent [--header-duration:420ms] data-compact:border-[#dbe8ee] data-compact:bg-[#fbfdff]/92 data-compact:backdrop-blur-md data-compact:[--header-duration:300ms] motion-safe:transition-[background-color,border-color] motion-safe:duration-[var(--header-duration)] motion-safe:ease-in-out"
    >
      <header data-compact={compact || undefined} className={className}>
        {children}
      </header>
    </div>
  );
}
