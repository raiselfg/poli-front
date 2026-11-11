import { ArrowUpRight } from 'lucide-react';
import { wrap } from '../landing-styles';
import { links } from './constants/links';

export function SiteHeader() {
  return (
    <header
      className={`${wrap} mt-5 flex min-h-[68px] items-center justify-between gap-6 rounded-full border border-[#e0edf3] bg-[linear-gradient(145deg,#fff_15%,#f7fcff_100%)] py-[9px] pr-3 pl-5 shadow-[0_16px_40px_rgb(79_141_174_/_12%),0_3px_10px_rgb(79_141_174_/_6%),inset_0_1px_0_#fff] max-[700px]:mt-3 max-[700px]:min-h-[62px] max-[700px]:py-2 max-[700px]:pr-[9px] max-[700px]:pl-[14px]`}
    >
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
      <nav
        aria-label="Основная навигация"
        className="flex gap-[38px] text-[13px] font-[550] max-[900px]:gap-[18px] max-[700px]:hidden"
      >
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a
        href="#request"
        className="flex items-center gap-[18px] rounded-full bg-[#e8f5fa] px-[18px] py-[13px] text-[13px] font-semibold text-[#286686] motion-safe:transition-[transform,box-shadow] motion-safe:duration-[220ms] motion-safe:hover:-translate-y-[3px] motion-safe:hover:shadow-[0_14px_26px_rgb(50_111_145_/_22%)] max-[700px]:gap-[6px] max-[700px]:p-3 max-[700px]:text-[11px]"
      >
        Обсудить задачу <ArrowUpRight size={16} />
      </a>
    </header>
  );
}
