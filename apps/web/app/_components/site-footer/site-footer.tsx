import { Suspense } from "react";
import Link from "next/link";
import { copyrightYear, legalLinks, operator } from "@/lib/legal";
import { heading, wrap } from "../landing-styles";
import { ContactDetails } from "./components/contact-details";
import { ContactMap } from "./components/contact-map";
import { ContactReveal } from "./components/contact-reveal";
import { ContactsSkeleton } from "./components/contacts-skeleton";

export function SiteFooter() {
  return (
    <footer id="contacts" className="scroll-mt-6 pt-[85px] pb-[25px]">
      <div className={wrap}>
        <h2 className={heading}>Контакты</h2>
        <div className="mt-12 flex flex-col gap-8 pb-[70px] min-[900px]:flex-row min-[900px]:justify-between min-[900px]:gap-[50px] min-[900px]:pb-[100px]">
          <Suspense fallback={null}>
            <ContactMap />
          </Suspense>
          <div className="w-full min-[900px]:max-w-[min(40%,480px)]">
            <ContactReveal>
              <Suspense fallback={<ContactsSkeleton />}>
                <ContactDetails />
              </Suspense>
            </ContactReveal>
          </div>
        </div>
        <div className="border-t border-zinc-300 pt-[22px]">
          <nav
            aria-label="Юридическая информация"
            className="flex flex-wrap gap-x-6 gap-y-2 text-[length:calc(12px*var(--text-scale))] font-medium text-zinc-700 max-[700px]:text-[length:calc(11px*var(--text-scale))]"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-zinc-950 focus-visible:text-zinc-950"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="mt-3 max-w-[760px] text-[length:calc(11px*var(--text-scale))] leading-[1.6] text-zinc-600">
            Информация на сайте носит справочный характер и не является публичной офертой (ст. 437
            ГК РФ). Стоимость и сроки изготовления рассчитываются по запросу.
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
