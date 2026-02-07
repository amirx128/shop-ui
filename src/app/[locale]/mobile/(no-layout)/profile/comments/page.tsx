import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CommentsContainer from '@/components/pages/Profile/comments/CommentsContainer';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('profile');
  const title = t('items.comments');

  return {
    title,
    description: title,
  };
}

export default function CommentsPage() {
  return <CommentsContainer />;
}
