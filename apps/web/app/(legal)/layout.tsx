import type { ReactNode } from 'react';

export default function LegalLayout({ children }: { children: ReactNode }) {
  return <main className="flex-1">{children}</main>;
}
