import type { Viewport } from 'next';
import { Catalog } from './_components/catalog/catalog';
import { Hero } from './_components/hero/hero';
import { Request } from './_components/request/request';
import { SiteFooter } from './_components/site-footer/site-footer';
import { SiteHeader } from './_components/site-header/site-header';

export const viewport: Viewport = { viewportFit: 'cover' };

export default function Home() {
  return (
    <div id="top" className="landing bg-bg text-ink">
      <SiteHeader />
      <main>
        <Hero />
        <Catalog />
        <Request />
      </main>
      <SiteFooter />
    </div>
  );
}
