import type { ReactNode } from 'react';
import { LegalFooter } from './_components/legal-footer';
import { LegalHeader } from './_components/legal-header';

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="isolate flex min-h-full flex-col bg-[radial-gradient(ellipse_70%_18%_at_92%_3%,#c8c8cf_0%,transparent_72%),var(--page-background)] font-sans text-zinc-900 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-zinc-700 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-zinc-700">
      <LegalHeader />
      <main className="flex-1">{children}</main>
      <LegalFooter />
    </div>
  );
}
