import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined';
import { Box, Typography } from '@mui/material';
import type {
  WalletTransactionDisplay,
  WalletTransactionType,
} from '../types/wallet';

interface TransactionCellProps {
  transaction: WalletTransactionDisplay;
  currencyLabel: string;
}

interface TransactionMeta {
  icon: React.ReactNode;
  color: string;
}

const transactionMetaByType: Record<WalletTransactionType, TransactionMeta> = {
  purchase: {
    icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 18 }} />,
    color: 'secondary.main',
  },
  charge: {
    icon: <ShowChartOutlinedIcon sx={{ fontSize: 18 }} />,
    color: 'success.main',
  },
  refund: {
    icon: <SouthOutlinedIcon sx={{ fontSize: 18 }} />,
    color: 'primary.main',
  },
  gift: {
    icon: <CardGiftcardOutlinedIcon sx={{ fontSize: 18 }} />,
    color: 'warning.main',
  },
};

export default function TransactionCell({
  transaction,
  currencyLabel,
}: TransactionCellProps) {
  const sign = transaction.direction === 'decrease' ? '-' : '+';
  const amountColor =
    transaction.direction === 'decrease' ? 'error.main' : 'success.main';
  const meta = transactionMetaByType[transaction.type];

  return (
    <Box
      sx={{
        py: 1.5,
        borderBottom: 1,
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: 'grey.100',
            color: meta.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {meta.icon}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'text.primary' }}>
            {transaction.title}
          </Typography>
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
            {transaction.date}
          </Typography>
        </Box>
      </Box>

      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 700,
          color: amountColor,
          flexShrink: 0,
        }}
      >
        {`${sign}${transaction.formattedAmount} ${currencyLabel}`}
      </Typography>
    </Box>
  );
}
