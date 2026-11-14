import { Catalog } from './_components/catalog/catalog';
import { Hero } from './_components/hero/hero';
import { Request } from './_components/request/request';
import { SiteFooter } from './_components/site-footer/site-footer';
import { SiteHeader } from './_components/site-header/site-header';
import { ScrollBackground } from './_components/scroll-background/scroll-background';

export default function Home() {
  return (
    <div
      id="top"
      className="isolate overflow-clip bg-[radial-gradient(ellipse_70%_18%_at_92%_3%,#e4e4e7_0%,transparent_72%),radial-gradient(ellipse_65%_15%_at_2%_25%,#e4e4e7_0%,transparent_74%),radial-gradient(ellipse_70%_15%_at_100%_48%,#e4e4e7_0%,transparent_75%),radial-gradient(ellipse_70%_14%_at_0%_76%,#e4e4e7_0%,transparent_75%),linear-gradient(160deg,#fff_0%,#fafafa_38%,#fff_68%,#f4f4f5_100%)] font-sans text-zinc-900 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-zinc-700 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-zinc-700"
    >
      <ScrollBackground />
      <div className="relative z-10">
        <SiteHeader />
        <main>
          <Hero />
          <Catalog />
          <Request />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
