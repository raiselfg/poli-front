import { ArrowUpRight } from 'lucide-react';
import { wrap } from '../landing-styles';
import { HeaderNav } from './components/header-nav';

export function SiteHeader() {
  return (
    <header
      className={`${wrap} group/header relative isolate mt-5 flex min-h-[68px] items-center justify-between gap-6 rounded-full border border-[#e0edf3] bg-[linear-gradient(145deg,#fff_15%,#f7fcff_100%)] py-[9px] pr-3 pl-5 shadow-[0_16px_40px_rgb(79_141_174_/_12%),0_3px_10px_rgb(79_141_174_/_6%),inset_0_1px_0_#fff] max-[700px]:mt-3 max-[700px]:min-h-[62px] max-[700px]:py-2 max-[700px]:pr-[9px] max-[700px]:pl-[14px]`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-full"
      >
        <span className="absolute inset-0 bg-[linear-gradient(105deg,transparent_8%,#deeff9_42%,#e8effa_62%,transparent_94%)] opacity-0 transition-opacity duration-500 ease-in-out group-focus-within/header:opacity-65 group-hover/header:opacity-65 motion-safe:-translate-x-[12%] motion-safe:transition-[translate,opacity] motion-safe:duration-1000 motion-safe:group-focus-within/header:translate-x-[12%] motion-safe:group-hover/header:translate-x-[12%]" />
      </span>
      <a
        href="#top"
        aria-label="На главную"
        className="flex items-center gap-3 text-[16px] leading-[1.05] font-bold tracking-[-0.04em] max-[700px]:text-[14px]"
      >
        <span
          aria-hidden="true"
          className="grid size-[34px] -rotate-[10deg] grid-cols-2 gap-[3px] [&>span]:rounded-[50%_50%_10%_50%] [&>span]:bg-[#326f91] [&>span:nth-child(2)]:bg-[#68a9ca] [&>span:nth-child(3)]:bg-[#68a9ca]"
        >
          <span />
          <span />
          <span />
          <span />
        </span>
        <span>
          Полиуретан
          <br />
          <b className="text-[9px] font-medium tracking-[0.02em]">
            производство изделий
          </b>
        </span>
      </a>
      <HeaderNav />
      <a
        href="#request"
        className="group/cta flex items-center gap-[18px] rounded-full bg-[#e8f5fa] px-[18px] py-[13px] text-[13px] font-semibold text-[#286686] transition-colors duration-300 ease-in-out hover:bg-[#dceff7] focus-visible:bg-[#dceff7] motion-safe:transition-[background-color,translate,box-shadow] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_6px_14px_rgb(79_141_174_/_18%)] motion-safe:focus-visible:-translate-y-1 motion-safe:focus-visible:shadow-[0_6px_14px_rgb(79_141_174_/_18%)] max-[700px]:gap-[6px] max-[700px]:p-3 max-[700px]:text-[11px]"
      >
        Обсудить задачу
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="motion-safe:transition-[translate] motion-safe:duration-300 motion-safe:ease-in-out motion-safe:group-hover/cta:translate-x-0.5 motion-safe:group-hover/cta:-translate-y-0.5 motion-safe:group-focus-visible/cta:translate-x-0.5 motion-safe:group-focus-visible/cta:-translate-y-0.5"
        />
      </a>
    </header>
  );
}
