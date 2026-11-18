import { Suspense } from 'react';
import Link from 'next/link';
import { unstable_rethrow } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { BrandLogo } from '@/components/brand-logo';
import { getContacts, getPhoneHref } from '../../_lib/contacts/contacts';
import { accentAction, wrap } from '../landing-styles';
import { HeaderNav } from './components/header-nav';
import { MobileNav } from './components/mobile-nav';
import { requestHref } from './constants/links';

async function HeaderPhone() {
  const contacts = await getContacts().catch((error: unknown) => {
    unstable_rethrow(error);
    return null;
  });
  const href = getPhoneHref(contacts?.phone ?? '');
  if (contacts === null || href === undefined) return null;

  return (
    <a
      href={href}
      className="landing-link font-mono text-sm font-bold whitespace-nowrap underline decoration-transparent underline-offset-4 hover:decoration-current"
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
        <Link
          href="/#top"
          aria-label="На главную"
          className="justify-self-start"
        >
          <BrandLogo />
        </Link>
        <HeaderNav />
        <div className="landing:flex hidden items-center justify-end gap-4">
          <Suspense fallback={null}>
            <HeaderPhone />
          </Suspense>
          <Link href={requestHref} className={accentAction}>
            Прислать чертёж
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <div className="landing:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
