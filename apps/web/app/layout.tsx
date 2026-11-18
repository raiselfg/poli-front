import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Nunito_Sans } from 'next/font/google';
import { z } from 'zod';
import './globals.css';
import { SiteToaster } from '@/components/site-theme';
import { brandName } from '@/lib/brand';
import { themeScript } from '@/lib/theme';
import { SiteFooter } from './_components/site-footer/site-footer';
import { SiteHeader } from './_components/site-header/site-header';

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

const siteUrl = process.env.SITE_URL?.trim() ?? '';
const metadataBase =
  siteUrl === ''
    ? undefined
    : new URL(z.url({ protocol: /^https?$/ }).parse(siteUrl));

export const metadata: Metadata = {
  metadataBase,
  applicationName: brandName,
  title: {
    default: `${brandName} — полиуретановые изделия на заказ в Санкт-Петербурге`,
    template: `%s | ${brandName}`,
  },
  description: `«${brandName}» — производство изделий из полиуретана в Санкт-Петербурге. Изготавливаем втулки, отбойники, демпферы, манжеты и детали по чертежу, ТЗ или фото.`,
  openGraph: {
    type: 'website',
    siteName: brandName,
    locale: 'ru_RU',
    images:
      metadataBase === undefined
        ? undefined
        : [
            {
              url: '/images/alvin-share.png',
              width: 1200,
              height: 630,
              type: 'image/png',
              alt: `${brandName} — полиуретановые изделия на заказ`,
            },
          ],
  },
  twitter: {
    card: metadataBase === undefined ? 'summary' : 'summary_large_image',
  },
};

export const viewport: Viewport = { viewportFit: 'cover' };

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="ru"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`h-full scroll-pt-[88px] font-sans antialiased motion-safe:scroll-smooth max-[700px]:scroll-pt-[74px] ${nunitoSans.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <div
          id="top"
          className="landing bg-bg text-ink flex min-h-dvh flex-col"
        >
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
        <SiteToaster />
      </body>
    </html>
  );
}
