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
        className="pointer-events-auto grid size-11 shrink-0 place-items-center rounded-full border border-zinc-200 bg-white/70 text-zinc-800 transition-colors duration-200 ease-in-out hover:bg-white focus-visible:bg-white"
      >
        <Menu size={20} aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[86%] max-w-[360px] overflow-y-auto rounded-l-[28px] border-zinc-200 bg-zinc-50 text-zinc-900"
      >
        <SheetHeader className="px-6 pt-6 pb-2">
          <SheetTitle className="text-[length:calc(18px*var(--text-scale))] font-semibold text-zinc-900">
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
              className="rounded-xl px-3 py-3.5 text-[length:calc(16px*var(--text-scale))] font-medium text-zinc-600 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:bg-zinc-100 focus-visible:text-zinc-950"
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
            className="flex min-h-[54px] items-center justify-center gap-2.5 rounded-full bg-zinc-700 px-5 text-[length:calc(14px*var(--text-scale))] font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-zinc-950 focus-visible:bg-zinc-950"
          >
            Прислать чертёж
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
