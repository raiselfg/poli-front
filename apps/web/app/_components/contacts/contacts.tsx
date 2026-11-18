import { Suspense } from 'react';
import { catalogFooterWrap } from '../landing-styles';
import { ContactDetails } from './components/contact-details';
import { ContactsSkeleton } from './components/contacts-skeleton';

export function Contacts() {
  return (
    <section
      id="contacts"
      aria-labelledby="contacts-title"
      className={`${catalogFooterWrap} scroll-mt-6 pt-[85px] max-[700px]:pt-6`}
    >
      <h2
        id="contacts-title"
        className="mt-[26px] mb-0 text-[length:calc(clamp(46px,5vw,72px)*var(--text-scale))] leading-[0.98] font-medium tracking-[-0.045em] max-[700px]:text-[length:calc(clamp(43px,10vw,62px)*var(--text-scale))]"
      >
        Контакты
      </h2>
      <Suspense fallback={<ContactsSkeleton />}>
        <ContactDetails />
      </Suspense>
    </section>
  );
}
