import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Nunito_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@workspace/ui/components/sonner';

const nunitoSans = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-inter',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '700'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Полиуретановые изделия на заказ в Санкт-Петербурге',
  description:
    'Втулки, отбойники, демпферы, манжеты и детали по чертежам. Производство изделий из полиуретана в Санкт-Петербурге по чертежу, ТЗ или фото.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="ru"
      className={`h-full scroll-pt-[88px] font-sans antialiased motion-safe:scroll-smooth max-[700px]:scroll-pt-[74px] ${nunitoSans.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Toaster duration={5000} />
      </body>
    </html>
  );
}
