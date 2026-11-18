import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ThemeToggle } from '@/components/site-theme';
import { brandName } from '@/lib/brand';
import { copyrightYear, legalLinks, operator } from '@/lib/legal';
import { catalogFooterWrap } from '../landing-styles';
import { SiteFooterFrame } from './components/site-footer-frame';

export function SiteFooter() {
  return (
    <SiteFooterFrame>
      <div className={catalogFooterWrap}>
        <div className="border-line border-t pt-[22px]">
          <dl className="text-ink-muted mb-5 text-sm">
            <dt className="text-xs font-semibold">Юридическое наименование</dt>
            <dd className="text-ink font-bold wrap-anywhere">
              {operator.name}
            </dd>
          </dl>
          <nav
            aria-label="Юридическая информация"
            className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm leading-snug"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group/legal-link text-accent-ink inline-flex max-w-full min-w-0 items-center gap-1.5 font-semibold"
              >
                <span className="underline-offset-4 group-hover/legal-link:underline group-focus-visible/legal-link:underline">
                  {link.label}
                </span>
                <ChevronRight
                  className="size-[13px] shrink-0"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </nav>
          <p className="text-ink-muted mt-3 text-[length:calc(11px*var(--text-scale))] leading-[1.6]">
            Информация на сайте носит справочный характер и не является публичной офертой (ст. 437 ГК РФ). Стоимость и сроки изготовления рассчитываются по запросу.
          </p>
          <div className="border-line mt-6 flex flex-col items-start gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="min-w-0">
              <p className="text-ink text-sm font-semibold">
                © {copyrightYear} {brandName}
              </p>
              <p className="text-ink-muted mt-1 text-xs leading-snug text-balance">
                Производство полиуретановых изделий · Санкт-Петербург
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </SiteFooterFrame>
  );
}
