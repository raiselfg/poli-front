import { Suspense } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { operator } from '@/lib/legal';
import { getContacts, getPhoneHref } from '../../_lib/contacts/contacts';
import { accentAction, wrap } from '../landing-styles';
import { HeaderNav } from './components/header-nav';
import { MobileNav } from './components/mobile-nav';

async function HeaderPhone() {
  const contacts = await getContacts().catch(() => null);
  const href = getPhoneHref(contacts?.phone ?? '');
  if (contacts === null || href === undefined) return null;

  return (
    <a
      href={href}
      className="landing-link font-mono text-sm font-bold whitespace-nowrap hover:underline hover:underline-offset-4"
    >
      {contacts.phone}
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="border-line bg-bg sticky top-0 z-30 border-b">
      <div
        className={`${wrap} min-h-header landing:grid landing:grid-cols-[1fr_auto_1fr] flex items-center justify-between gap-4`}
      >
        <a
          href="#top"
          className="tracking-heading flex items-center gap-2.5 justify-self-start font-extrabold"
        >
          <span
            aria-hidden="true"
            className="size-brand-mark bg-landing-accent shrink-0"
          />
          {operator.name}
        </a>
        <HeaderNav />
        <div className="landing:flex hidden items-center justify-end gap-4">
          <Suspense fallback={null}>
            <HeaderPhone />
          </Suspense>
          <a href="#request" className={accentAction}>
            Прислать чертёж
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <div className="landing:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
