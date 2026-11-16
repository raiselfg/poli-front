import { Suspense } from "react";
import Link from "next/link";
import { copyrightYear, legalLinks, operator } from "@/lib/legal";
import { heading, wrap } from "../landing-styles";
import { ContactDetails } from "./components/contact-details";
import { ContactsSkeleton } from "./components/contacts-skeleton";

export function SiteFooter() {
  return (
    <footer id="contacts" className="landing-footer py-section">
      <div className={wrap}>
        <h2 className={heading}>Контакты</h2>
        <div className="mt-8 mb-8">
          <Suspense fallback={<ContactsSkeleton />}>
            <ContactDetails />
          </Suspense>
        </div>
        <div className="border-line border-t pt-5">
          <nav
            aria-label="Юридическая информация"
            className="text-ink-muted flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="landing-link decoration-line hover:text-ink hover:decoration-ink underline underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-ink-muted mt-3 max-w-prose text-sm leading-relaxed">
            Информация на сайте носит справочный характер и не является
            публичной офертой (ст. 437 ГК РФ). Стоимость и сроки изготовления
            рассчитываются по запросу.
          </p>
          <div className="text-ink-muted mt-5 flex flex-wrap justify-between gap-4 font-mono text-xs font-medium tracking-wide">
            <span>ПРОИЗВОДСТВО ПОЛИУРЕТАНОВЫХ ИЗДЕЛИЙ · САНКТ-ПЕТЕРБУРГ</span>
            <span>
              © {copyrightYear} {operator.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
