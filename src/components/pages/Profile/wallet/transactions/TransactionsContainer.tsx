import { Box, Container } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import TransactionHeader from './components/TransactionHeader';
import TransactionCard from './components/TransactionCard';
import type {
  TransactionCardLabels,
  WalletTransactionsAccountOption,
  WalletTransactionsFilterLabels,
  WalletTransactionsFilterTabOption,
  WalletTransactionsHeaderLabels,
  WalletTransactionItem,
} from './types/transactions';

export default async function TransactionsContainer() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('profile'),
  ]);

  const headerLabels: WalletTransactionsHeaderLabels = {
    backToWallet: t('walletTransactions.header.backToWallet'),
    filters: t('walletTransactions.header.filters'),
  };

  const tabOptions: WalletTransactionsFilterTabOption[] = [
    {
      value: 'all',
      label: t('walletTransactions.filterModal.tabs.all'),
      count: 15,
    },
    {
      value: 'deposit',
      label: t('walletTransactions.filterModal.tabs.deposit'),
      count: 10,
    },
    {
      value: 'withdraw',
      label: t('walletTransactions.filterModal.tabs.withdraw'),
      count: 5,
    },
  ];

  const accountOptions: WalletTransactionsAccountOption[] = [
    {
      value: 'wallet',
      label: t('walletTransactions.filterModal.accountTypes.wallet'),
    },
    {
      value: 'bank',
      label: t('walletTransactions.filterModal.accountTypes.bank'),
    },
  ];

  const filterLabels: WalletTransactionsFilterLabels = {
    title: t('walletTransactions.filterModal.title'),
    accountTypePlaceholder: t('walletTransactions.filterModal.accountTypePlaceholder'),
    transactionAmountTitle: t('walletTransactions.filterModal.transactionAmountTitle'),
    amountToPlaceholder: t('walletTransactions.filterModal.amountToPlaceholder'),
    amountFromPlaceholder: t('walletTransactions.filterModal.amountFromPlaceholder'),
    transactionDateTitle: t('walletTransactions.filterModal.transactionDateTitle'),
    dateFromPlaceholder: t('walletTransactions.filterModal.dateFromPlaceholder'),
    dateToPlaceholder: t('walletTransactions.filterModal.dateToPlaceholder'),
    apply: t('walletTransactions.filterModal.apply'),
    validation: {
      amountRange: t('walletTransactions.filterModal.validation.amountRange'),
      dateRange: t('walletTransactions.filterModal.validation.dateRange'),
    },
  };

  const numberFormatter = new Intl.NumberFormat(locale);
  const cardLabels: TransactionCardLabels = {
    success: t('walletTransactions.cards.status.success'),
    failed: t('walletTransactions.cards.status.failed'),
    details: t('walletTransactions.cards.details'),
    currency: t('walletProfile.currency'),
  };

  const transactions: WalletTransactionItem[] = [
    {
      id: 'wallet-transaction-1',
      type: 'purchase',
      title: t('walletTransactions.cards.transactions.purchase.title'),
      date: t('walletTransactions.cards.transactions.purchase.date'),
      amount: numberFormatter.format(1200000),
      direction: 'decrease',
      status: 'success',
    },
    {
      id: 'wallet-transaction-2',
      type: 'charge',
      title: t('walletTransactions.cards.transactions.charge.title'),
      date: t('walletTransactions.cards.transactions.charge.date'),
      amount: numberFormatter.format(2400000),
      direction: 'increase',
      status: 'success',
    },
    {
      id: 'wallet-transaction-3',
      type: 'refund',
      title: t('walletTransactions.cards.transactions.refund.title'),
      date: t('walletTransactions.cards.transactions.refund.date'),
      amount: numberFormatter.format(620000),
      direction: 'increase',
      status: 'failed',
    },
    {
      id: 'wallet-transaction-4',
      type: 'gift',
      title: t('walletTransactions.cards.transactions.gift.title'),
      date: t('walletTransactions.cards.transactions.gift.date'),
      amount: numberFormatter.format(180000),
      direction: 'decrease',
      status: 'success',
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <TransactionHeader
        locale={locale}
        headerLabels={headerLabels}
        filterLabels={filterLabels}
        tabOptions={tabOptions}
        accountOptions={accountOptions}
      />

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Container sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                labels={cardLabels}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
