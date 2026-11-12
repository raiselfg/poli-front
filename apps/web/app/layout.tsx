import type { Metadata } from 'next';
import { Nunito_Sans, Spectral } from 'next/font/google';
import './globals.css';
import { Toaster } from '@workspace/ui/components/sonner';

const nunitoSans = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
});

const spectral = Spectral({
  subsets: ['cyrillic'],
  weight: '600',
  style: ['normal', 'italic'],
  display: 'swap',
  preload: false,
  variable: '--font-spectral',
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
      className={`h-full scroll-pt-[88px] font-sans antialiased motion-safe:scroll-smooth max-[700px]:scroll-pt-[74px] ${nunitoSans.variable} ${spectral.variable}`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster duration={5000} />
      </body>
    </html>
  );
}
