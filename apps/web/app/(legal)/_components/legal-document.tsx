import type { ReactNode } from 'react';
import { cn } from '@workspace/ui/lib/utils';
import { legalUpdatedAt } from '@/lib/legal';
import { wrap } from '../../_components/landing-styles';

const documentLinks =
  '[&_a]:text-landing-accent [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-ink';

const legalProse = cn(
  'rounded-panel border-line bg-surface text-ink-muted mt-5 border px-5 py-6 leading-relaxed wrap-anywhere sm:mt-7 sm:px-9 sm:py-8',
  '[&>section+section]:border-line [&>section]:space-y-4 [&>section+section]:mt-6 [&>section+section]:border-t [&>section+section]:pt-6',
  '[&_h2]:text-ink [&_h2]:tracking-heading [&_h2]:text-xl [&_h2]:leading-snug [&_h2]:font-extrabold sm:[&_h2]:text-2xl',
  '[&_h3]:text-ink [&_h3]:text-lg [&_h3]:leading-snug [&_h3]:font-bold',
  '[&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5',
  '[&_li::marker]:text-landing-accent [&_strong]:text-ink [&_strong]:font-bold',
  documentLinks
);

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
    <article className={`${wrap} py-section`}>
      <div className="mx-auto max-w-[50rem]">
        <header className="rounded-panel border-line border-t-landing-accent from-surface to-landing-accent/8 border border-t-4 bg-linear-to-br px-5 py-6 sm:px-9 sm:py-9">
          <p className="text-landing-accent font-mono text-xs font-bold">
            Редакция от {legalUpdatedAt}
          </p>
          <h1 className="tracking-heading mt-4 text-[clamp(1.625rem,4.5vw,3rem)] leading-[1.1] font-extrabold text-balance wrap-anywhere">
            {title}
          </h1>
          <div
            className={`text-ink-muted mt-5 max-w-prose leading-relaxed ${documentLinks}`}
          >
            {lead}
          </div>
        </header>
        <div className={legalProse}>{children}</div>
      </div>
    </article>
  );
}
