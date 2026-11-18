import { Catalog } from './_components/catalog/catalog';
import { Contacts } from './_components/contacts/contacts';
import { Hero } from './_components/hero/hero';
import { Industries } from './_components/industries/industries';
import { OrderTerms } from './_components/order-terms/order-terms';
import { ProductionCapabilities } from './_components/production-capabilities/production-capabilities';
import { Request } from './_components/request/request';

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductionCapabilities />
      <Catalog />
      <Industries />
      <OrderTerms />
      <Request />
      <Contacts />
    </main>
  );
}
