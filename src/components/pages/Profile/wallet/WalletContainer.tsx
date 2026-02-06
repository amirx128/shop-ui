import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import { Box, Container, Typography } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import WalletHeader from './components/WalletHeader';
import WalletChargeModalAction from './components/WalletChargeModalAction';
import WalletWithdrawModalAction from './components/WalletWithdrawModalAction';
import TransactionCell from './components/TransactionCell';
import type {
  WalletChargeModalLabels,
  WalletChargePresetOption,
  WalletWithdrawModalLabels,
  WalletTransaction,
  WalletTransactionDisplay,
} from './types/wallet';
import { ROUTES } from '@/lib/routes';

export default async function WalletContainer() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('profile'),
  ]);

  const numberFormatter = new Intl.NumberFormat(locale);
  const currencyLabel = t('walletProfile.currency');

  const rawTransactions: WalletTransaction[] = [
    {
      id: 'wallet-tx-1',
      type: 'purchase',
      title: t('walletProfile.transactions.purchase.title'),
      date: t('walletProfile.transactions.purchase.date'),
      amount: 540000,
      direction: 'decrease',
    },
    {
      id: 'wallet-tx-2',
      type: 'charge',
      title: t('walletProfile.transactions.charge.title'),
      date: t('walletProfile.transactions.charge.date'),
      amount: 1200000,
      direction: 'increase',
    },
    {
      id: 'wallet-tx-3',
      type: 'refund',
      title: t('walletProfile.transactions.refund.title'),
      date: t('walletProfile.transactions.refund.date'),
      amount: 380000,
      direction: 'increase',
    },
    {
      id: 'wallet-tx-4',
      type: 'gift',
      title: t('walletProfile.transactions.gift.title'),
      date: t('walletProfile.transactions.gift.date'),
      amount: 60000,
      direction: 'increase',
    },
  ];

  const transactions: WalletTransactionDisplay[] = rawTransactions.map(
    (transaction) => ({
      ...transaction,
      formattedAmount: numberFormatter.format(transaction.amount),
    }),
  );

  const balance = 2540000;
  const formattedBalance = numberFormatter.format(balance);
  const balanceText = `${formattedBalance} ${currencyLabel}`;

  const chargePresets: WalletChargePresetOption[] = [
    {
      value: 500000,
      label: t('walletProfile.chargeModal.presets.first'),
    },
    {
      value: 1000000,
      label: t('walletProfile.chargeModal.presets.second'),
    },
    {
      value: 5000000,
      label: t('walletProfile.chargeModal.presets.third'),
    },
  ];

  const chargeModalLabels: WalletChargeModalLabels = {
    trigger: t('walletProfile.actions.charge'),
    title: t('walletProfile.chargeModal.title'),
    balanceLabel: t('walletProfile.balanceLabel'),
    selectAmountLabel: t('walletProfile.chargeModal.selectAmountLabel'),
    customAmountLabel: t('walletProfile.chargeModal.customAmountLabel'),
    customAmountPlaceholder: t('walletProfile.chargeModal.customAmountPlaceholder'),
    submit: t('walletProfile.chargeModal.submit'),
    successDescription: t('walletProfile.chargeModal.successDescription'),
    acknowledge: t('walletProfile.chargeModal.acknowledge'),
  };
  const phoneNumber = locale.startsWith('fa') ? '۰۹۱۲۴۹۳۷۴۴۶' : '09124937446';
  const withdrawModalLabels: WalletWithdrawModalLabels = {
    trigger: t('walletProfile.actions.withdraw'),
    title: t('walletProfile.withdrawModal.title'),
    balanceLabel: t('walletProfile.balanceLabel'),
    amountLabel: t('walletProfile.withdrawModal.amountLabel'),
    amountPlaceholder: t('walletProfile.withdrawModal.amountPlaceholder'),
    withdrawAll: t('walletProfile.withdrawModal.withdrawAll'),
    shebaLabel: t('walletProfile.withdrawModal.shebaLabel'),
    shebaPlaceholder: t('walletProfile.withdrawModal.shebaPlaceholder'),
    shebaHelper: t('walletProfile.withdrawModal.shebaHelper'),
    shebaError: t('walletProfile.withdrawModal.shebaError'),
    submit: t('walletProfile.withdrawModal.submit'),
    note: t('walletProfile.withdrawModal.note'),
    otpTitle: t('walletProfile.withdrawModal.otpTitle'),
    otpLabel: t('walletProfile.withdrawModal.otpLabel', { phone: phoneNumber }),
    otpPlaceholder: t('walletProfile.withdrawModal.otpPlaceholder'),
    otpTimer: t('walletProfile.withdrawModal.otpTimer'),
    otpResend: t('walletProfile.withdrawModal.otpResend'),
    otpSubmit: t('walletProfile.withdrawModal.otpSubmit'),
    successDescription: t('walletProfile.withdrawModal.successDescription'),
    acknowledge: t('walletProfile.withdrawModal.acknowledge'),
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          py: 2,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'background.default',
          flexShrink: 0,
        }}
      >
        <Container>
          <WalletHeader title={t('items.wallet')} backHref={ROUTES.profile.BASE} />
        </Container>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Container sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box
              sx={{
                borderRadius: 1,
                backgroundColor: 'primary.main',
                color: 'common.white',
                px: 2,
                py: 2.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 16 }} />
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'common.white' }}>
                  {t('walletProfile.balanceLabel')}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: 'common.white',
                }}
              >
                {formattedBalance} {currencyLabel}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  flexWrap: 'wrap',
                }}
              >
                <WalletChargeModalAction
                  labels={chargeModalLabels}
                  balanceText={balanceText}
                  presets={chargePresets}
                />

                <WalletWithdrawModalAction
                  labels={withdrawModalLabels}
                  balance={balance}
                  balanceText={balanceText}
                />
              </Box>
            </Box>

            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 1,
                backgroundColor: 'rgba(34, 58, 120, 0.05)',
                px: 1.5,
                py: 1,
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    color: 'common.white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CardGiftcardOutlinedIcon sx={{ fontSize: 18 }} />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                  <Typography sx={{ fontSize: 14, color: 'text.primary' }}>
                    {t('walletProfile.promo.title')}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                    {t('walletProfile.promo.subtitle')}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: 'text.primary' }}>
                  {t('walletProfile.latestTransactions')}
                </Typography>

                <Link
                  href={ROUTES.profile.WALLET_TRANSACTIONS}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.25,
                      color: 'text.secondary',
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 13, fontWeight: 500, color: 'text.secondary' }}
                    >
                      {t('walletProfile.viewAll')}
                    </Typography>
                    <ArrowBackOutlinedIcon sx={{ fontSize: 16 }} />
                  </Box>
                </Link>
              </Box>

              <Box
                sx={{
                  borderRadius: 1,
                  backgroundColor: 'background.paper',
                }}
              >
                {transactions.map((transaction) => (
                  <TransactionCell
                    key={transaction.id}
                    transaction={transaction}
                    currencyLabel={currencyLabel}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
