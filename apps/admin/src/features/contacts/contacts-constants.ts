import type { ContactFormValues } from './contacts-form-schema';

export const contactFieldLabels: Record<keyof ContactFormValues, string> = {
  phone: 'Телефон',
  email: 'Email',
  address: 'Адрес',
  latitude: 'Широта',
  longitude: 'Долгота',
  working_hours: 'Часы работы',
  telegram_url: 'Ссылка Telegram',
  whatsapp_url: 'Ссылка WhatsApp',
};
