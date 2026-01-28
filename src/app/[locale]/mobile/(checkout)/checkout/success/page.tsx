import { getLocale, getTranslations } from 'next-intl/server';
import SuccessContainer from '@/components/pages/checkout/success/SuccessContainer';

export async function generateMetadata() {
  const t = await getTranslations('checkout');
  const title = t('success.metadata.title');

  return {
    title,
    description: title,
  };
}

export default async function SuccessPage() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('checkout'),
  ]);

  const translations = {
    title: t('success.title'),
    description: t('success.description'),
    actionLabel: t('success.actionLabel'),
  };

  const homeHref = `/${locale}/mobile`;

  return <SuccessContainer translations={translations} homeHref={homeHref} />;
}
