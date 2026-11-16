import type { Viewport } from 'next';
import { Catalog } from './_components/catalog/catalog';
import { Hero } from './_components/hero/hero';
import { OrderTerms } from './_components/order-terms/order-terms';
import { ProductionCapabilities } from './_components/production-capabilities/production-capabilities';
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
        <ProductionCapabilities />
        <OrderTerms />
        <Catalog />
        <Request />
      </main>
      <SiteFooter />
    </div>
  );
}
