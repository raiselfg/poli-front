import { ArrowUpRight } from 'lucide-react';
import { getContacts, getPhoneHref } from '../../../_lib/contacts/contacts';
import { accentAction } from '../../landing-styles';
import { ContactMap } from './contact-map';

export async function ContactDetails() {
  const result = await getContacts().then(
    (contacts) => ({ contacts, error: false as const }),
    (error: unknown) => {
      console.error('Не удалось загрузить контакты', error);
      return { error: true as const };
    }
  );
  if (result.error)
    return (
      <p className="text-ink-muted">
        Не удалось загрузить контакты. Попробуйте обновить страницу.
      </p>
    );
  const contacts = result.contacts;
  if (contacts === null)
    return <p className="text-ink-muted">Контакты пока не добавлены.</p>;

  const phoneHref = getPhoneHref(contacts.phone);
  const email = contacts.email ?? '';
  const telegram = contacts.telegram_url ?? '';
  const whatsapp = contacts.whatsapp_url ?? '';
  const hours = contacts.working_hours ?? '';
  const contactRows = [
    { label: 'Телефон', value: contacts.phone, href: phoneHref },
    {
      label: 'Почта',
      value: email,
      href: email !== '' ? `mailto:${email}` : undefined,
    },
    { label: 'Адрес', value: contacts.address },
    { label: 'Часы работы', value: hours },
    {
      label: 'Мессенджер',
      value: telegram !== '' ? 'Telegram' : '',
      href: telegram,
    },
    {
      label: 'Мессенджер',
      value: whatsapp !== '' ? 'WhatsApp' : '',
      href: whatsapp,
    },
  ];
  const shortcuts = [
    { label: 'Позвонить', href: phoneHref },
    { label: 'Telegram', href: telegram },
    { label: 'WhatsApp', href: whatsapp },
  ].filter(({ href }) => href !== undefined && href !== '');

  return (
    <>
      <div className="flex flex-col gap-8 min-[900px]:flex-row min-[900px]:justify-between min-[900px]:gap-[50px]">
        <ContactMap
          latitude={contacts.latitude}
          longitude={contacts.longitude}
        />
        <address className="w-full min-w-0 not-italic min-[900px]:max-w-[min(40%,480px)]">
          <p className="tracking-heading mb-4 text-xl font-extrabold">
            Название компании
          </p>
          <dl>
            {contactRows.map(({ label, value, href }) =>
              value !== '' ? (
                <ContactRow
                  key={`${label}:${value}`}
                  label={label}
                  value={value}
                  href={href}
                />
              ) : null
            )}
          </dl>
        </address>
      </div>
      {shortcuts.length > 0 ? (
        <nav
          aria-label="Быстрая связь"
          className="landing-contact-bar border-line bg-bg landing:hidden fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t"
        >
          {shortcuts.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={
                href === phoneHref
                  ? `${accentAction} flex-1 px-2`
                  : 'rounded-control border-ink bg-surface hover:bg-ink hover:text-surface inline-flex min-h-11 flex-1 items-center justify-center border px-2 text-sm font-bold'
              }
            >
              {label}
            </a>
          ))}
        </nav>
      ) : null}
    </>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const external = href?.startsWith('http') === true;

  return (
    <div className="border-line border-t py-3">
      <dt className="text-ink-muted text-sm">{label}</dt>
      <dd className="mt-1 font-mono text-sm font-bold wrap-anywhere">
        {href === undefined ? (
          value
        ) : (
          <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="decoration-amber-accent flex w-full items-center justify-between gap-2 underline underline-offset-4 hover:decoration-current"
          >
            <span className="min-w-0">{value}</span>
            <ArrowUpRight size={14} className="shrink-0" aria-hidden="true" />
          </a>
        )}
      </dd>
    </div>
  );
}
