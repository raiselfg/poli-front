import { FileText, Paperclip, Phone } from 'lucide-react';

export const requestSteps = [
  {
    title: 'Опишите деталь',
    description: 'Расскажите, что нужно изготовить.',
    icon: FileText,
  },
  {
    title: 'Добавьте файл',
    description: 'Чертёж, фото или ТЗ — если они есть.',
    icon: Paperclip,
  },
  {
    title: 'Оставьте телефон',
    description: 'Мы свяжемся с вами, чтобы обсудить задачу.',
    icon: Phone,
  },
];
