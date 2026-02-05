import { getTranslations, getLocale } from 'next-intl/server';
import AuthContent from './components/AuthContent';

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'auth' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AuthContainer() {
  return <AuthContent />;
}
