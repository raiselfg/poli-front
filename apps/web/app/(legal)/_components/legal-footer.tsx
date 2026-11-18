import Link from 'next/link';
import { brandName } from '@/lib/brand';
import { copyrightYear, legalLinks, operator } from '@/lib/legal';
import { wrap } from '../../_components/landing-styles';

export function LegalFooter() {
  return (
    <footer className="border-line bg-surface border-t py-7 sm:py-8">
      <div className={wrap}>
        <nav
          aria-label="Юридическая информация"
          className="text-ink flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"
        >
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="landing-link decoration-landing-accent hover:text-landing-accent underline underline-offset-4"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-ink-muted mt-4 max-w-prose text-sm leading-relaxed">
          © {copyrightYear} {brandName} · {operator.city}. Информация на сайте
          носит справочный характер и не является публичной офертой (ст. 437 ГК
          РФ).
        </p>
      </div>
    </footer>
  );
}
