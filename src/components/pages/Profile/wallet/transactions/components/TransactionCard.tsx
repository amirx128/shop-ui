import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import { Box, Divider, Typography } from '@mui/material';
import Link from 'next/link';
import type {
  TransactionCardLabels,
  WalletTransactionItem,
  WalletTransactionType,
} from '../types/transactions';
import { ROUTES } from '@/lib/routes';

interface TransactionCardProps {
  transaction: WalletTransactionItem;
  labels: TransactionCardLabels;
}

const transactionTypeConfig: Record<
  WalletTransactionType,
  { icon: React.ElementType; color: 'secondary.main' | 'success.main' | 'primary.main' | 'warning.main' }
> = {
  purchase: {
    icon: ShoppingCartOutlinedIcon,
    color: 'secondary.main',
  },
  charge: {
    icon: StackedLineChartOutlinedIcon,
    color: 'success.main',
  },
  refund: {
    icon: SouthOutlinedIcon,
    color: 'primary.main',
  },
  gift: {
    icon: CardGiftcardOutlinedIcon,
    color: 'warning.main',
  },
};

export default function TransactionCard({ transaction, labels }: TransactionCardProps) {
  const config = transactionTypeConfig[transaction.type];
  const Icon = config.icon;
  const isIncrease = transaction.direction === 'increase';
  const isSuccess = transaction.status === 'success';
  const amountSign = isIncrease ? '+' : '-';
  const amountColor = isIncrease ? 'success.main' : 'error.main';
  const statusColor = isSuccess ? 'success.main' : 'error.main';
  const detailHref = `${ROUTES.profile.WALLET_TRANSACTIONS}/transaction/${transaction.id}`;

  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        p: '10px',
        backgroundColor: 'background.paper',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: 'grey.100',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon sx={{ fontSize: 18, color: config.color }} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'text.primary' }}>
              {transaction.title}
            </Typography>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
              {transaction.date}
            </Typography>
          </Box>
        </Box>

        <Typography sx={{ fontSize: 14, fontWeight: 700, color: amountColor }}>
          {`${transaction.amount}${amountSign} ${labels.currency}`}
        </Typography>
      </Box>

      <Divider
        sx={{
          my: 1.25,
          borderColor: 'divider',
          borderStyle: 'dashed',
        }}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {isSuccess ? (
            <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 16, color: statusColor }} />
          ) : (
            <CancelOutlinedIcon sx={{ fontSize: 16, color: statusColor }} />
          )}
          <Typography sx={{ fontSize: 12, fontWeight: 500, color: 'text.primary' }}>
            {isSuccess ? labels.success : labels.failed}
          </Typography>
        </Box>

        <Link href={detailHref} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.25,
              color: 'text.secondary',
            }}
          >
            <Typography sx={{ fontSize: 13, color: 'inherit' }}>{labels.details}</Typography>
            <ChevronLeftOutlinedIcon sx={{ fontSize: 16, color: 'inherit' }} />
          </Box>
        </Link>
      </Box>
    </Box>
  );
}
