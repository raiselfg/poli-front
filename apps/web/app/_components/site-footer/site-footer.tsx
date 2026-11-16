import { Suspense } from 'react';
import Link from 'next/link';
import { copyrightYear, legalLinks, operator } from '@/lib/legal';
import { catalogFooterWrap } from '../landing-styles';
import { ContactDetails } from './components/contact-details';
import { ContactsSkeleton } from './components/contacts-skeleton';

export function SiteFooter() {
  return (
    <footer
      id="contacts"
      className="landing-footer scroll-mt-6 pt-[85px] pb-[25px] max-[700px]:pt-6"
    >
      <div className={catalogFooterWrap}>
        <h2 className="mt-[26px] mb-0 text-[length:calc(clamp(46px,5vw,72px)*var(--text-scale))] leading-[0.98] font-medium tracking-[-0.045em] max-[700px]:text-[length:calc(clamp(43px,10vw,62px)*var(--text-scale))]">
          Контакты
        </h2>
        <Suspense fallback={<ContactsSkeleton />}>
          <ContactDetails />
        </Suspense>
        <div className="border-t border-zinc-300 pt-[22px]">
          <nav
            aria-label="Юридическая информация"
            className="flex flex-wrap gap-x-6 gap-y-2 text-[length:calc(12px*var(--text-scale))] font-medium text-zinc-700 max-[700px]:text-[length:calc(11px*var(--text-scale))]"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-landing-accent focus-visible:text-landing-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="mt-3 max-w-[760px] text-[length:calc(11px*var(--text-scale))] leading-[1.6] text-zinc-600">
            Информация на сайте носит справочный характер и не является
            публичной офертой (ст. 437 ГК РФ). Стоимость и сроки изготовления
            рассчитываются по запросу.
          </p>
          <div className="mt-5 flex flex-wrap justify-between gap-4 text-[length:calc(10px*var(--text-scale))] font-[650] tracking-[0.1em] text-zinc-700 max-[700px]:text-[length:calc(9px*var(--text-scale))]">
            <span className="max-[700px]:max-w-[220px]">
              ПРОИЗВОДСТВО ПОЛИУРЕТАНОВЫХ ИЗДЕЛИЙ · САНКТ-ПЕТЕРБУРГ
            </span>
            <span>
              © {copyrightYear} {operator.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
