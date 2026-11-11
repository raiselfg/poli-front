import type { Metadata } from 'next';
import { Geist, Geist_Mono, Nunito_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@workspace/ui/lib/utils';

const nunitoSans = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'Изделия из полиуретана под заказ',
  description:
    'Изготовление изделий из полиуретана, в том числе по чертежам заказчика.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="ru"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        nunitoSans.variable
      )}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
