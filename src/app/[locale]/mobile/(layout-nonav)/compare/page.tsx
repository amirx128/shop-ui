import { getTranslations } from 'next-intl/server';
import CompareContainer from '@/components/pages/Compare/CompareContainer';

export async function generateMetadata() {
  const t = await getTranslations('compare');
  const title = t('title');
  return {
    title,
    description: title,
  };
}

export default function ComparePage() {
  return <CompareContainer />;
}
