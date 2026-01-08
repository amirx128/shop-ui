import { getTranslations, getLocale } from 'next-intl/server';
import AuthContainer from '@/components/pages/Auth/AuthContainer';

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'auth' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function AuthPage() {
  return <AuthContainer />;
}
