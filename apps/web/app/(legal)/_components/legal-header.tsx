import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BrandLogo } from '@/components/brand-logo';
import { brandName } from '@/lib/brand';
import { accentAction, wrap } from '../../_components/landing-styles';

export function LegalHeader() {
  return (
    <header className="border-line border-b">
      <div
        className={`${wrap} min-h-header flex items-center justify-between gap-3 py-2`}
      >
        <Link
          href="/"
          aria-label={`${brandName} — на главную`}
          className="landing-link"
        >
          <BrandLogo />
        </Link>
        <Link
          href="/"
          className={`${accentAction} max-[359px]:gap-1.5 max-[359px]:px-2`}
        >
          <ArrowLeft size={15} aria-hidden="true" />
          На главную
        </Link>
      </div>
    </header>
  );
}
