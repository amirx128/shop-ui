import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'fa'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fa';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: {
      ...(await import(`./messages/${locale}/general.json`)).default,
      ...(await import(`./messages/${locale}/auth.json`)).default,
      ...(await import(`./messages/${locale}/product.json`)).default,
      ...(await import(`./messages/${locale}/cart.json`)).default,
      ...(await import(`./messages/${locale}/compare.json`)).default,
      ...(await import(`./messages/${locale}/checkout.json`)).default,
    },
  };
});
