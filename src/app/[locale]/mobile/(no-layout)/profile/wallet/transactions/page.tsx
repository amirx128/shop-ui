import { getTranslations } from 'next-intl/server';
import TransactionsContainer from '@/components/pages/Profile/wallet/transactions/TransactionsContainer';

export async function generateMetadata() {
  const t = await getTranslations('profile');
  const title = t('walletTransactions.title');

  return {
    title,
    description: title,
  };
}

export default function WalletTransactionsPage() {
  return <TransactionsContainer />;
}
