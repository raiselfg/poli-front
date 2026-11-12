import { ArrowUpRight } from 'lucide-react';
import { HeaderNav } from './components/header-nav';
import { StickyHeader } from './components/sticky-header';

export function SiteHeader() {
  // Keep the compact offsets independent of the grid tracks as the header resizes.
  return (
    <StickyHeader
      className={`group/header relative isolate mx-auto grid min-h-[68px] w-[min(100%-96px,1320px)] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center justify-between rounded-full border border-transparent px-5 py-[9px] [--header-compact-offset:calc(100%-50cqw+var(--header-compact-width)/2-3*var(--spacing)-5px)] [--header-compact-width:608px] [--header-ease:ease-in-out] data-compact:min-h-[54px] data-compact:w-[var(--header-compact-width)] data-compact:px-3 data-compact:py-1 data-compact:[--header-compactness:1] data-compact:[--header-ease:cubic-bezier(0.48,0,0.75,0.55)] motion-safe:transition-[width,min-height,padding,--header-compactness] motion-safe:duration-[var(--header-duration)] motion-safe:ease-[var(--header-ease)] max-[900px]:w-[min(100%-48px,1320px)] max-[900px]:px-3 max-[700px]:flex max-[700px]:min-h-[62px] max-[700px]:w-[calc(100%-36px)] max-[700px]:gap-3 max-[700px]:py-2 max-[700px]:pr-[9px] max-[700px]:pl-[14px] max-[700px]:data-compact:w-[min(100%-88px,328px)] max-[700px]:data-compact:pr-2 max-[700px]:data-compact:pl-3 min-[701px]:[container-type:inline-size]`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-auto absolute -inset-px -z-10 overflow-hidden rounded-full border border-[#e0edf3] bg-[linear-gradient(145deg,#fff_15%,#f7fcff_100%)] shadow-[0_16px_40px_rgb(79_141_174_/_12%),0_3px_10px_rgb(79_141_174_/_6%),inset_0_1px_0_#fff]"
      >
        <span className="absolute inset-0 bg-[linear-gradient(105deg,transparent_8%,#deeff9_42%,#e8effa_62%,transparent_94%)] opacity-0 transition-opacity duration-500 ease-in-out group-focus-within/header:opacity-65 group-hover/header:opacity-65 motion-safe:-translate-x-[12%] motion-safe:transition-[translate,opacity] motion-safe:duration-1000 motion-safe:group-focus-within/header:translate-x-[12%] motion-safe:group-hover/header:translate-x-[12%]" />
      </span>
      <a
        href="#top"
        aria-label="На главную"
        className="pointer-events-auto relative flex items-center gap-3 justify-self-start text-[16px] leading-[1.05] font-bold tracking-[-0.04em] group-data-compact/header:gap-2 motion-safe:transition-[gap] motion-safe:duration-[var(--header-duration)] motion-safe:ease-[var(--header-ease)] max-[700px]:min-w-0 max-[700px]:text-[14px] max-[700px]:group-data-compact/header:gap-0 min-[701px]:left-[calc(var(--header-compactness)*var(--header-compact-offset))] min-[701px]:[transform:translateX(calc(-100%*var(--header-compactness)))]"
      >
        <span
          aria-hidden="true"
          className="grid size-[34px] shrink-0 -rotate-[10deg] grid-cols-2 gap-[3px] [&>span]:rounded-[50%_50%_10%_50%] [&>span]:bg-[#326f91] [&>span:nth-child(2)]:bg-[#68a9ca] [&>span:nth-child(3)]:bg-[#68a9ca]"
        >
          <span />
          <span />
          <span />
          <span />
        </span>
        <span className="max-w-[130px] truncate motion-safe:transition-[max-width,opacity] motion-safe:duration-[var(--header-duration)] motion-safe:ease-in-out motion-safe:group-data-compact/header:ease-out max-[700px]:group-data-compact/header:max-w-0 max-[700px]:group-data-compact/header:opacity-0">
          Полиуретан
          <b className="block max-h-3 overflow-hidden text-[9px] font-medium tracking-[0.02em] group-data-compact/header:max-h-0 group-data-compact/header:opacity-0 motion-safe:transition-[max-height,opacity] motion-safe:duration-[var(--header-duration)] motion-safe:ease-in-out motion-safe:group-data-compact/header:ease-out">
            производство изделий
          </b>
        </span>
      </a>
      <HeaderNav />
      <a
        href="#request"
        aria-label="Прислать чертёж"
        className="group/cta pointer-events-auto relative flex shrink-0 items-center gap-[18px] justify-self-end rounded-full bg-[#e8f5fa] px-[18px] py-[13px] text-[13px] font-semibold text-[#286686] transition-colors duration-300 ease-in-out group-data-compact/header:gap-1.5 group-data-compact/header:px-2.5 group-data-compact/header:py-2 hover:bg-[#dceff7] focus-visible:bg-[#dceff7] motion-safe:transition-[translate,gap,padding,background-color,box-shadow] motion-safe:duration-[var(--header-duration)] motion-safe:ease-[ease-in-out,var(--header-ease),var(--header-ease),ease-in-out,ease-in-out] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_6px_14px_rgb(79_141_174_/_18%)] motion-safe:focus-visible:-translate-y-1 motion-safe:focus-visible:shadow-[0_6px_14px_rgb(79_141_174_/_18%)] max-[900px]:gap-3 max-[900px]:px-3 max-[700px]:gap-[6px] max-[700px]:p-3 max-[700px]:text-[11px] max-[700px]:group-data-compact/header:gap-[6px] max-[700px]:group-data-compact/header:px-2.5 max-[700px]:group-data-compact/header:py-2 min-[701px]:right-[calc(var(--header-compactness)*var(--header-compact-offset))] min-[701px]:[transform:translateX(calc(100%*var(--header-compactness)))]"
      >
        <span className="whitespace-nowrap">Прислать чертёж</span>
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="shrink-0 motion-safe:transition-[translate] motion-safe:duration-300 motion-safe:ease-in-out motion-safe:group-hover/cta:translate-x-0.5 motion-safe:group-hover/cta:-translate-y-0.5 motion-safe:group-focus-visible/cta:translate-x-0.5 motion-safe:group-focus-visible/cta:-translate-y-0.5"
        />
      </a>
    </StickyHeader>
  );
}
