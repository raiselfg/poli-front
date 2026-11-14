import type { ReactNode } from 'react';
import { legalUpdatedAt } from '@/lib/legal';

export const legalProseClassName =
  'mt-12 space-y-10 text-[length:calc(15px*var(--text-scale))] leading-[1.7] text-[#36566c] max-[700px]:mt-9 max-[700px]:space-y-8 max-[700px]:text-[length:calc(14px*var(--text-scale))] [&_section]:space-y-4 [&_h2]:text-[length:calc(20px*var(--text-scale))] [&_h2]:font-semibold [&_h2]:tracking-[-0.01em] [&_h2]:text-[#1f3a4d] max-[700px]:[&_h2]:text-[length:calc(18px*var(--text-scale))] [&_h3]:text-[length:calc(16px*var(--text-scale))] [&_h3]:font-semibold [&_h3]:text-[#1f3a4d] [&_a]:font-medium [&_a]:text-[#286686] [&_a]:underline [&_a]:decoration-[#9cc3d8] [&_a]:underline-offset-4 [&_a:hover]:decoration-[#286686] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_strong]:font-semibold [&_strong]:text-[#213b50] [&_table]:w-full [&_table]:border-collapse [&_table]:text-[length:calc(13px*var(--text-scale))] [&_table]:leading-[1.55] [&_th]:border [&_th]:border-[#cfe3ec] [&_th]:bg-[#f0f7fb] [&_th]:px-3 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-[#213b50] [&_td]:border [&_td]:border-[#cfe3ec] [&_td]:px-3 [&_td]:py-2.5 [&_td]:align-top';

export function LegalDocument({
  title,
  lead,
  children,
}: {
  title: string;
  lead: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto w-[min(100%-96px,820px)] py-[64px] max-[900px]:w-[min(100%-48px,820px)] max-[700px]:w-[calc(100%-36px)] max-[700px]:py-[44px]">
      <p className="text-[length:calc(13px*var(--text-scale))] text-[#587485]">
        Редакция от {legalUpdatedAt}
      </p>
      <h1 className="mt-4 text-[length:calc(clamp(32px,4.6vw,52px)*var(--text-scale))] leading-[1.05] font-medium tracking-[-0.035em] wrap-anywhere hyphens-auto text-[#1f3a4d]">
        {title}
      </h1>
      <div className="mt-6 text-[length:calc(16px*var(--text-scale))] leading-[1.65] text-[#36566c] max-[700px]:text-[length:calc(15px*var(--text-scale))]">
        {lead}
      </div>
      <div className={legalProseClassName}>{children}</div>
    </article>
  );
}
