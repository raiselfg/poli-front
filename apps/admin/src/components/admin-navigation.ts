import { ClipboardList, Folder, LayoutDashboard, Phone } from 'lucide-react';

export const links = [
  { to: '/', label: 'Главная', icon: LayoutDashboard },
  { to: '/requests', label: 'Заявки', icon: ClipboardList },
  { to: '/categories', label: 'Категории', icon: Folder },
  { to: '/contacts', label: 'Контакты', icon: Phone },
] as const;
