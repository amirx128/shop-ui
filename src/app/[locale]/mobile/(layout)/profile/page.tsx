import { getTranslations } from 'next-intl/server';
import ProfileContainer from '@/components/pages/Profile/ProfileContainer';

export async function generateMetadata() {
  const t = await getTranslations('profile');
  const title = t('title');

  return {
    title,
    description: title,
  };
}

export default function ProfilePage() {
  return <ProfileContainer />;
}
