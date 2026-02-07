import { getTranslations } from 'next-intl/server';
import FavoritesContainer from '@/components/pages/Profile/favorites/FavoritesContainer';

export async function generateMetadata() {
  const t = await getTranslations('profile');
  const title = t('items.favorites');

  return {
    title,
    description: title,
  };
}

export default function FavoritesPage() {
  return <FavoritesContainer />;
}
