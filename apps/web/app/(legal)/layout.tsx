import type { ReactNode } from 'react';
import { LegalFooter } from './_components/legal-footer';
import { LegalHeader } from './_components/legal-header';

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="landing bg-bg text-ink flex min-h-dvh flex-col">
      <LegalHeader />
      <main className="flex-1">{children}</main>
      <LegalFooter />
    </div>
  );
}
