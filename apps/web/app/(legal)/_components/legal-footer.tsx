import Link from 'next/link';
import { copyrightYear, legalLinks, operator } from '@/lib/legal';

export function LegalFooter() {
  return (
    <footer className="border-t border-[#c8dfe8] py-8">
      <div className="mx-auto w-[min(100%-96px,1320px)] max-[900px]:w-[min(100%-48px,1320px)] max-[700px]:w-[calc(100%-36px)]">
        <nav
          aria-label="Юридическая информация"
          className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-medium text-[#334f63] max-[700px]:text-[11px]"
        >
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[#174d71] focus-visible:text-[#174d71]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="mt-4 text-[11px] leading-[1.6] text-[#547183]">
          © {copyrightYear} {operator.name} · {operator.city}. Информация на
          сайте носит справочный характер и не является публичной офертой (ст.
          437 ГК РФ).
        </p>
      </div>
    </footer>
  );
}
