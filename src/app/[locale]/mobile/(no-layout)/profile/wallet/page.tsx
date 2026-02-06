import { getTranslations } from 'next-intl/server';
import WalletContainer from '@/components/pages/Profile/wallet/WalletContainer';

export async function generateMetadata() {
  const t = await getTranslations('profile');
  const title = t('items.wallet');

  return {
    title,
    description: title,
  };
}

export default function WalletPage() {
  return <WalletContainer />;
}
