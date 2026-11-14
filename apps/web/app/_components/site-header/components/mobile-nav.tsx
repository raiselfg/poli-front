'use client';

import { useState } from 'react';
import { ArrowUpRight, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@workspace/ui/components/sheet';
import { links } from '../constants/links';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Открыть меню"
        className="pointer-events-auto grid size-11 shrink-0 place-items-center rounded-full border border-[#dbeaf1] bg-white/70 text-[#2d607c] transition-colors duration-200 ease-in-out hover:bg-white focus-visible:bg-white"
      >
        <Menu size={20} aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[86%] max-w-[360px] overflow-y-auto rounded-l-[28px] border-[#dbeaf1] bg-[#fbfeff] text-[#213b50]"
      >
        <SheetHeader className="px-6 pt-6 pb-2">
          <SheetTitle className="text-[length:calc(18px*var(--text-scale))] font-semibold text-[#213b50]">
            Меню
          </SheetTitle>
        </SheetHeader>
        <nav
          aria-label="Мобильная навигация"
          className="flex flex-col gap-1 px-4"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setOpen(false);
              }}
              className="rounded-xl px-3 py-3.5 text-[length:calc(16px*var(--text-scale))] font-medium text-[#36556a] transition-colors duration-200 hover:bg-[#eef7fb] hover:text-[#174d71] focus-visible:bg-[#eef7fb] focus-visible:text-[#174d71]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto p-4">
          <a
            href="#request"
            onClick={() => {
              setOpen(false);
            }}
            className="flex min-h-[54px] items-center justify-center gap-2.5 rounded-full bg-[#326f91] px-5 text-[length:calc(14px*var(--text-scale))] font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-[#245b78] focus-visible:bg-[#245b78]"
          >
            Прислать чертёж
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
