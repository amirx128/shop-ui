import { getTranslations } from 'next-intl/server';
import AccountProfileContainer from '@/components/pages/Profile/account/AccountProfileContainer';

export async function generateMetadata() {
  const t = await getTranslations('profile');
  const title = t('accountProfile.title');

  return {
    title,
    description: title,
  };
}

export default function AccountProfilePage() {
  return <AccountProfileContainer />;
}
