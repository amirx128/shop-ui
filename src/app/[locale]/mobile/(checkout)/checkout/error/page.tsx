import { getLocale, getTranslations } from 'next-intl/server';
import ErrorContainer from '@/components/pages/checkout/error/ErrorContainer';

export async function generateMetadata() {
  const t = await getTranslations('checkout');
  const title = t('error.metadata.title');

  return {
    title,
    description: title,
  };
}

export default async function ErrorPage() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('checkout'),
  ]);

  const translations = {
    title: t('error.title'),
    description: t('error.description'),
    actionLabel: t('error.actionLabel'),
  };

  const homeHref = `/${locale}/mobile`;

  return <ErrorContainer translations={translations} homeHref={homeHref} />;
}
