'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@workspace/ui/components/sheet';
import { accentAction } from '../../landing-styles';
import { links, requestHref } from '../constants/links';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Открыть меню"
        className="landing-control rounded-control border-line bg-surface text-ink hover:bg-line grid size-11 shrink-0 place-items-center border"
      >
        <Menu size={20} aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="landing-dialog border-line bg-bg text-ink w-full overflow-y-auto shadow-none"
      >
        <SheetHeader className="px-6 pt-6 pb-2">
          <SheetTitle className="text-ink text-lg font-bold">Меню</SheetTitle>
        </SheetHeader>
        <nav
          aria-label="Мобильная навигация"
          className="flex flex-col gap-1 px-4"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                setOpen(false);
              }}
              className="landing-link rounded-control text-ink-muted hover:bg-line hover:text-ink px-3 py-3.5 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-4">
          <Link
            href={requestHref}
            onClick={() => {
              setOpen(false);
            }}
            className={`${accentAction} w-full`}
          >
            Прислать чертёж
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
