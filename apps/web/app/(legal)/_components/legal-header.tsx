import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { operator } from '@/lib/legal';

export function LegalHeader() {
  return (
    <header className="border-b border-[#dbeaf1]/80">
      <div className="mx-auto flex min-h-[78px] w-[min(100%-96px,1320px)] items-center justify-between gap-6 py-4 max-[900px]:w-[min(100%-48px,1320px)] max-[700px]:min-h-[64px] max-[700px]:w-[calc(100%-36px)]">
        <Link
          href="/"
          aria-label="На главную"
          className="flex items-center gap-2.5 text-[length:calc(17px*var(--text-scale))] leading-none font-semibold tracking-[-0.02em] text-[#1f3a4d] transition-colors hover:text-[#174d71] max-[700px]:text-[length:calc(16px*var(--text-scale))]"
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
          {operator.name}
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-[#dbeaf1] bg-white/70 px-4 py-2 text-[length:calc(13px*var(--text-scale))] font-semibold text-[#2d607c] transition-colors duration-200 hover:bg-white focus-visible:bg-white max-[700px]:px-3.5"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          На главную
        </Link>
      </div>
    </header>
  );
}
