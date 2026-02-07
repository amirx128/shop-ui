import { getTranslations } from 'next-intl/server';
import TransactionDetailContainer from '@/components/pages/Profile/wallet/transactions/transactionDetail/TransactionDetailContainer';

export async function generateMetadata() {
  const t = await getTranslations('profile');
  const title = t('walletTransactions.transactionDetail.title');

  return {
    title,
    description: title,
  };
}

export default async function WalletTransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <TransactionDetailContainer transactionId={id} />;
}
