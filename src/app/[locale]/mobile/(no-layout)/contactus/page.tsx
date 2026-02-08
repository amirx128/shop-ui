import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactusContainer from '@/components/pages/contactus/ContactusContainer';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('contactus');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function ContactusPage() {
  return <ContactusContainer />;
}
