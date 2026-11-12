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
      className="pointer-events-none sticky top-0 z-30 min-h-[88px] pt-5 [--header-duration:420ms] data-compact:pt-2 data-compact:[--header-duration:300ms] motion-safe:transition-[padding-top] motion-safe:duration-[var(--header-duration)] motion-safe:ease-in-out max-[700px]:min-h-[74px] max-[700px]:pt-3 max-[700px]:data-compact:pt-1.5"
    >
      <header data-compact={compact || undefined} className={className}>
        {children}
      </header>
    </div>
  );
}
