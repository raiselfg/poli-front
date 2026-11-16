import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { operator } from '@/lib/legal';
import { accentAction, wrap } from '../../_components/landing-styles';

export function LegalHeader() {
  return (
    <header className="border-line border-b">
      <div
        className={`${wrap} min-h-header flex items-center justify-between gap-3 py-2`}
      >
        <Link
          href="/"
          aria-label={`${operator.name} — на главную`}
          className="landing-link tracking-heading flex min-w-0 items-center gap-2.5 font-extrabold wrap-anywhere"
        >
          <span
            aria-hidden="true"
            className="size-brand-mark bg-landing-accent shrink-0"
          />
          {operator.name}
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
