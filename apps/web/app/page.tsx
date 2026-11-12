import { Catalog } from './_components/catalog/catalog';
import { CustomManufacturing } from './_components/custom-manufacturing/custom-manufacturing';
import { Hero } from './_components/hero/hero';
import { Request } from './_components/request/request';
import { SiteFooter } from './_components/site-footer/site-footer';
import { SiteHeader } from './_components/site-header/site-header';
import { ScrollBackground } from './_components/scroll-background/scroll-background';

export default function Home() {
  return (
    <div
      id="top"
      className="isolate overflow-hidden bg-[radial-gradient(ellipse_70%_18%_at_92%_3%,#dceff9_0%,transparent_72%),radial-gradient(ellipse_65%_15%_at_2%_25%,#e3f4fb_0%,transparent_74%),radial-gradient(ellipse_70%_15%_at_100%_48%,#e8f5fc_0%,transparent_75%),radial-gradient(ellipse_70%_14%_at_0%_76%,#e3f3fb_0%,transparent_75%),linear-gradient(160deg,#fff_0%,#f6fbfe_38%,#fff_68%,#eff8fc_100%)] font-sans text-[#213b50] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[#347ba1] [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-[#347ba1]"
    >
      <ScrollBackground />
      <div className="relative z-10">
        <SiteHeader />
        <main>
          <Hero />
          <Catalog />
          <CustomManufacturing />
          <Request />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
