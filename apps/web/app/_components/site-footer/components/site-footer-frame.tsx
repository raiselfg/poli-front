'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export function SiteFooterFrame({ children }: { children: ReactNode }) {
  const isHome = usePathname() === '/';

  return (
    <footer className="landing-footer mt-auto pb-[25px]" data-home={isHome}>
      {children}
    </footer>
  );
}
