import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  type LucideIcon,
} from 'lucide-react';
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
      <p className="my-7 text-zinc-700">
        Не удалось загрузить контакты. Попробуйте обновить страницу.
      </p>
    );
  const contacts = result.contacts;
  if (contacts === null)
    return <p className="my-7 text-zinc-700">Контакты пока не добавлены.</p>;

  const phoneHref = getPhoneHref(contacts.phone);
  const shortcuts = [
    { label: 'Позвонить', href: phoneHref },
    { label: 'Telegram', href: contacts.telegram_url ?? undefined },
    { label: 'WhatsApp', href: contacts.whatsapp_url ?? undefined },
  ].filter(({ href }) => href !== undefined && href !== '');

  return (
    <>
      <div className="mt-12 flex flex-col gap-8 pb-[70px] max-[700px]:mt-8 max-[700px]:pb-8 min-[900px]:flex-row min-[900px]:justify-between min-[900px]:gap-[50px] min-[900px]:pb-[100px]">
        <ContactMap
          latitude={contacts.latitude}
          longitude={contacts.longitude}
        />
        <address className="grid w-full min-w-0 divide-y divide-zinc-800/20 self-start text-zinc-900 not-italic min-[900px]:max-w-[min(40%,480px)]">
          {contacts.phone !== '' && (
            <ContactRow
              icon={Phone}
              label="Телефон"
              value={contacts.phone}
              href={phoneHref}
            />
          )}
          {contacts.email !== null && contacts.email !== '' && (
            <ContactRow
              icon={Mail}
              label="Почта"
              value={contacts.email}
              href={`mailto:${contacts.email}`}
            />
          )}
          {contacts.address !== '' && (
            <ContactRow icon={MapPin} label="Адрес" value={contacts.address} />
          )}
          {contacts.working_hours !== null && contacts.working_hours !== '' && (
            <ContactRow
              icon={Clock}
              label="Часы работы"
              value={contacts.working_hours}
            />
          )}
          {contacts.telegram_url !== null && contacts.telegram_url !== '' && (
            <ContactRow
              icon={MessageCircle}
              label="Мессенджер"
              value="Telegram"
              href={contacts.telegram_url}
            />
          )}
          {contacts.whatsapp_url !== null && contacts.whatsapp_url !== '' && (
            <ContactRow
              icon={MessageCircle}
              label="Мессенджер"
              value="WhatsApp"
              href={contacts.whatsapp_url}
            />
          )}
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
                  : 'landing-control rounded-control border-ink bg-surface hover:bg-ink hover:text-surface inline-flex min-h-11 flex-1 items-center justify-center border px-2 text-sm font-bold'
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
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const row = (
    <>
      <span className="text-landing-accent grid size-10 shrink-0 place-items-center rounded-full bg-white/50 transition-colors duration-300 group-hover:bg-white/80 group-focus-visible:bg-white/80">
        <Icon size={18} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold text-zinc-600">
          {label}
        </span>
        <span className="decoration-landing-accent block text-base leading-snug font-bold wrap-anywhere underline-offset-4 group-hover:underline group-focus-visible:underline">
          {value}
        </span>
      </span>
      {href !== undefined && (
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="ml-auto shrink-0 motion-safe:transition-[translate] motion-safe:duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:translate-x-0.5"
        />
      )}
    </>
  );
  const className = 'flex items-center gap-4 py-3';
  if (href === undefined) return <div className={className}>{row}</div>;

  const external = href.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`${className} group rounded-lg`}
    >
      {row}
    </a>
  );
}
