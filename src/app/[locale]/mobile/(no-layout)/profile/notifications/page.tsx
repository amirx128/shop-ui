import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import NotificationsContainer from '@/components/pages/Profile/notifications/NotificationsContainer';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('profile');
  const title = t('items.notifications');

  return {
    title,
    description: title,
  };
}

export default function NotificationsPage() {
  return <NotificationsContainer />;
}
