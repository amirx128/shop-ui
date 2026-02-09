import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AboutusContainer from '@/components/pages/aboutus/AboutusContainer';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('aboutus');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function AboutusPage() {
  return <AboutusContainer />;
}
