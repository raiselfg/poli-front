import type { ReactNode } from 'react';
import { LegalFooter } from './_components/legal-footer';
import { LegalHeader } from './_components/legal-header';

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="isolate flex min-h-full flex-col bg-[radial-gradient(ellipse_70%_18%_at_92%_3%,#dceff9_0%,transparent_72%),linear-gradient(160deg,#fff_0%,#f6fbfe_38%,#fff_68%,#eff8fc_100%)] font-sans text-[#213b50] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[#347ba1] [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-[#347ba1]">
      <LegalHeader />
      <main className="flex-1">{children}</main>
      <LegalFooter />
    </div>
  );
}
