import { ArrowUpRight } from 'lucide-react';
import { HeaderNav } from './components/header-nav';
import { MobileNav } from './components/mobile-nav';
import { StickyHeader } from './components/sticky-header';

export function SiteHeader() {
  return (
    <StickyHeader className="pointer-events-auto mx-auto grid min-h-[78px] w-[min(100%-96px,1320px)] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-6 py-[18px] data-compact:min-h-[62px] data-compact:py-[11px] motion-safe:transition-[min-height,padding] motion-safe:duration-[var(--header-duration)] motion-safe:ease-in-out max-[900px]:w-[min(100%-48px,1320px)] max-[700px]:flex max-[700px]:min-h-[64px] max-[700px]:w-[calc(100%-36px)] max-[700px]:justify-between max-[700px]:gap-4 max-[700px]:py-2.5 max-[700px]:data-compact:min-h-[56px] max-[700px]:data-compact:py-2">
      <a
        href="#top"
        aria-label="На главную"
        className="pointer-events-auto flex items-center gap-2.5 justify-self-start text-[17px] leading-none font-semibold tracking-[-0.02em] text-[#1f3a4d] focus-visible:text-[#174d71] max-[700px]:min-w-0 max-[700px]:text-[16px]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          className="size-[28px] shrink-0 text-[#326f91]"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16 2a14 14 0 1 1 0 28 14 14 0 0 1 0-28Zm0 8.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"
          />
        </svg>
        Полиуретан
      </a>
      <HeaderNav />
      <a
        href="#request"
        aria-label="Прислать чертёж"
        className="group/cta pointer-events-auto inline-flex shrink-0 items-center gap-2 justify-self-end rounded-full bg-[#326f91] px-4 py-2.5 text-[13px] font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-[#245b78] focus-visible:bg-[#245b78] max-[900px]:px-3.5 max-[700px]:hidden"
      >
        <span className="whitespace-nowrap">Прислать чертёж</span>
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="shrink-0 transition-transform duration-300 ease-in-out group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 group-focus-visible/cta:translate-x-0.5 group-focus-visible/cta:-translate-y-0.5 motion-reduce:transition-none"
        />
      </a>
      <div className="min-[700px]:hidden">
        <MobileNav />
      </div>
    </StickyHeader>
  );
}
