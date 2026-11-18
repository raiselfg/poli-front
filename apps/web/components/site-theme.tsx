'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Toaster } from '@workspace/ui/components/sonner';
import { setSiteTheme } from '@/lib/theme';

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return () => {
    observer.disconnect();
  };
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains('dark');
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerSnapshot
  );

  return (
    <div className="text-ink-muted flex min-h-11 items-center gap-3 text-[13px] leading-tight font-semibold tracking-normal">
      <span aria-hidden="true">Тема сайта</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        role="switch"
        aria-label="Тёмная тема"
        aria-checked={dark}
        className="border-line text-ink-muted hover:text-ink-muted isolate grid h-auto w-auto grid-cols-[repeat(2,39px)] grid-rows-[32px] gap-[3px] rounded-full bg-(--theme-track-bg) p-[3px] transition-none [--theme-track-bg:color-mix(in_srgb,var(--landing-accent)_9%,var(--landing-surface))] hover:bg-(--theme-track-bg) dark:hover:bg-(--theme-track-bg)"
        onClick={() => {
          setSiteTheme(!getThemeSnapshot());
        }}
      >
        <span
          aria-hidden="true"
          className="bg-landing-accent pointer-events-none col-start-1 row-start-1 self-stretch rounded-full motion-safe:transition-transform motion-safe:duration-250 motion-safe:ease-[var(--landing-motion-ease)] dark:translate-x-[calc(100%+3px)]"
        />
        <Sun
          className="not-dark:text-on-dark z-10 col-start-1 row-start-1 size-[17px] place-self-center motion-safe:transition-colors"
          strokeWidth={1.7}
          aria-hidden="true"
        />
        <Moon
          className="dark:text-on-dark z-10 col-start-2 row-start-1 size-[17px] place-self-center motion-safe:transition-colors"
          strokeWidth={1.7}
          aria-hidden="true"
        />
      </Button>
    </div>
  );
}

export function SiteToaster() {
  const dark = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerSnapshot
  );

  return (
    <Toaster
      duration={5000}
      theme={dark ? 'dark' : 'light'}
      toastOptions={{
        classNames: { toast: 'cn-toast' },
        closeButtonAriaLabel: 'Закрыть уведомление',
      }}
    />
  );
}
