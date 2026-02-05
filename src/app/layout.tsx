import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import type { Locale } from '@/i18n';
import { defaultLocale, locales } from '@/i18n';
import './globals.css';
import Providers from './providers';
import ServiceWorkerRegister from './service-worker-register';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const yekan = localFont({
  src: './fonts/yekan/YekanBakhFaNum-Regular.woff2',
  variable: '--font-yekan',
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kaleskechi',
  description:
    "A beautiful and attractive children's world, a place for dreams and creativity!",
};

type RootLayoutProps = {
  children: ReactNode;
  params?: {
    locale?: Locale | string;
  };
};

export default function RootLayout({ children, params }: RootLayoutProps) {
  const localeParam = params?.locale ?? defaultLocale;
  const resolvedLocale = locales.includes(localeParam as Locale)
    ? (localeParam as Locale)
    : defaultLocale;
  const dir = resolvedLocale === 'fa' ? 'rtl' : 'ltr';
  const fontClass =
    resolvedLocale === 'fa'
      ? yekan.className
      : `${geistSans.className} ${geistMono.className}`;

  return (
    <html lang={resolvedLocale} dir={dir}>
      <body className={`${fontClass} antialiased`}>
        <ServiceWorkerRegister />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
