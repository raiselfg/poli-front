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
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (position) => {
    if (!scrolled && position >= 24) setScrolled(true);
    if (scrolled && position <= 8) setScrolled(false);
  });

  return (
    <div
      data-scrolled={scrolled || undefined}
      className="pointer-events-none sticky top-0 z-30 border-b border-transparent bg-transparent [--header-duration:420ms] data-scrolled:border-zinc-300 data-scrolled:bg-zinc-200 data-scrolled:[--header-duration:300ms] motion-safe:transition-[background-color,border-bottom-color] motion-safe:duration-[var(--header-duration)] motion-safe:ease-in-out"
    >
      <header className={className}>{children}</header>
    </div>
  );
}
