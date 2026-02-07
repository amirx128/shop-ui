import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import { Box, Container, Divider, Typography } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import TransactionDetailHeader from './components/TransactionDetailHeader';
import TransactionDetailInfoItem from './components/TransactionDetailInfoItem';
import TransactionDetailSupportFooter from './components/TransactionDetailSupportFooter';
import type { TransactionDetailLabels } from './types/transactionDetail';
import { ROUTES } from '@/lib/routes';

interface TransactionDetailContainerProps {
  transactionId: string;
}

export default async function TransactionDetailContainer({
  transactionId,
}: TransactionDetailContainerProps) {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('profile'),
  ]);

  const numberFormatter = new Intl.NumberFormat(locale);
  const currency = t('walletProfile.currency');
  const amount = `${numberFormatter.format(2540000)} ${currency}`;
  const orderAmount = `${numberFormatter.format(2450000)} ${currency}`;
  const orderDetailHref = `${ROUTES.profile.ORDER_DETAIL}/${encodeURIComponent(transactionId || '1')}`;
  const isWalletChargeTransaction = transactionId === 'wallet-transaction-2';
  const isWalletFailedChargeTransaction = transactionId === 'wallet-transaction-3';
  const isChargeLikeTransaction =
    isWalletChargeTransaction || isWalletFailedChargeTransaction;
  const showOrderSections = !isChargeLikeTransaction;

  const labels: TransactionDetailLabels = {
    title: t('walletTransactions.transactionDetail.title'),
    purchaseInvoice: t('walletTransactions.transactionDetail.purchaseInvoice'),
    statusSuccess: t('walletTransactions.transactionDetail.status.success'),
    trackingNumberLabel: t('walletTransactions.transactionDetail.fields.trackingNumber'),
    trackingNumberValue: t('walletTransactions.transactionDetail.values.trackingNumber'),
    orderNumberLabel: t('walletTransactions.transactionDetail.fields.orderNumber'),
    orderNumberValue: t('walletTransactions.transactionDetail.values.orderNumber'),
    viewOrder: t('walletTransactions.transactionDetail.actions.viewOrder'),
    transactionTypeLabel: t('walletTransactions.transactionDetail.fields.transactionType'),
    transactionTypeValue: t('walletTransactions.transactionDetail.values.transactionType'),
    dateTimeLabel: t('walletTransactions.transactionDetail.fields.dateTime'),
    dateTimeValue: t('walletTransactions.transactionDetail.values.dateTime'),
    orderAmountLabel: t('walletTransactions.transactionDetail.fields.orderAmount'),
    supportTitle: t('walletTransactions.transactionDetail.support.title'),
    supportAction: t('walletTransactions.transactionDetail.support.action'),
    supportIconAlt: t('walletTransactions.transactionDetail.support.iconAlt'),
  };
  const TransactionIcon = isWalletChargeTransaction
    || isWalletFailedChargeTransaction
    ? StackedLineChartOutlinedIcon
    : ShoppingCartOutlinedIcon;
  const transactionTitle = isChargeLikeTransaction
    ? t('walletProfile.transactions.charge.title')
    : labels.purchaseInvoice;
  const transactionIconColor = isChargeLikeTransaction
    ? 'success.main'
    : 'secondary.main';
  const statusText = isWalletFailedChargeTransaction
    ? t('walletTransactions.transactionDetail.status.failed')
    : labels.statusSuccess;
  const StatusIcon = isWalletFailedChargeTransaction
    ? CancelOutlinedIcon
    : CheckCircleOutlineOutlinedIcon;
  const statusColor = isWalletFailedChargeTransaction ? 'error.main' : 'success.main';
  const statusBackgroundColor = isWalletFailedChargeTransaction
    ? 'rgba(243, 18, 96, 0.1)'
    : 'rgba(18, 161, 80, 0.1)';

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
          <TransactionDetailHeader
            title={labels.title}
            backHref={ROUTES.profile.WALLET_TRANSACTIONS}
          />
        </Container>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Container sx={{ py: 2 }}>
          <Box
            sx={{
              backgroundColor: 'background.paper',
            }}
          >
            <Box
              sx={{
                py: 2.5,
                px: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  backgroundColor: 'grey.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TransactionIcon sx={{ fontSize: 26, color: transactionIconColor }} />
              </Box>

              <Typography sx={{ fontSize: 22, fontWeight: 700, color: 'text.primary' }}>
                {amount}
              </Typography>

              <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                {transactionTitle}
              </Typography>

              <Box
                sx={{
                  borderRadius: '10px',
                  px: '10px',
                  py: '10px',
                  backgroundColor: statusBackgroundColor,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <StatusIcon sx={{ fontSize: 16, color: statusColor }} />
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: statusColor }}>
                  {statusText}
                </Typography>
              </Box>
            </Box>

            <Divider />

            <Box sx={{ py: 2, px: 2 }}>
              <TransactionDetailInfoItem
                label={labels.trackingNumberLabel}
                value={labels.trackingNumberValue}
              />
            </Box>

            {showOrderSections ? (
              <>
                <Divider />

                <Box
                  sx={{
                    py: 2,
                    px: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                  }}
                >
                  <TransactionDetailInfoItem
                    label={labels.orderNumberLabel}
                    value={labels.orderNumberValue}
                  />

                  <Link
                    href={orderDetailHref}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, color: 'action.hover' }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 500, color: 'inherit' }}>
                        {labels.viewOrder}
                      </Typography>
                      <ChevronLeftOutlinedIcon sx={{ fontSize: 16, color: 'inherit' }} />
                    </Box>
                  </Link>
                </Box>
              </>
            ) : null}

            <Divider />

            <Box sx={{ py: 2, px: 2 }}>
              <TransactionDetailInfoItem
                label={labels.transactionTypeLabel}
                value={labels.transactionTypeValue}
              />
            </Box>

            <Divider />

            <Box sx={{ py: 2, px: 2 }}>
              <TransactionDetailInfoItem
                label={labels.dateTimeLabel}
                value={labels.dateTimeValue}
              />
            </Box>

            {showOrderSections ? (
              <>
                <Divider />

                <Box sx={{ py: 2, px: 2 }}>
                  <TransactionDetailInfoItem
                    label={labels.orderAmountLabel}
                    value={orderAmount}
                  />
                </Box>
              </>
            ) : null}
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          py: 2,
          backgroundColor: 'background.default',
          flexShrink: 0,
        }}
      >
        <Container>
          <TransactionDetailSupportFooter
            title={labels.supportTitle}
            action={labels.supportAction}
            iconAlt={labels.supportIconAlt}
          />
        </Container>
      </Box>
    </Box>
  );
}
