'use client';

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import TransactionsFilterModalAction from './TransactionsFilterModalAction';
import type {
  WalletTransactionsAccountOption,
  WalletTransactionsFilterLabels,
  WalletTransactionsFilterTabOption,
  WalletTransactionsHeaderLabels,
} from '../types/transactions';
import { ROUTES } from '@/lib/routes';

interface TransactionHeaderProps {
  locale: string;
  headerLabels: WalletTransactionsHeaderLabels;
  filterLabels: WalletTransactionsFilterLabels;
  tabOptions: WalletTransactionsFilterTabOption[];
  accountOptions: WalletTransactionsAccountOption[];
}

export default function TransactionHeader({
  locale,
  headerLabels,
  filterLabels,
  tabOptions,
  accountOptions,
}: TransactionHeaderProps) {
  return (
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Link
            href={ROUTES.profile.WALLET}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.primary',
              }}
            >
              <ArrowForwardOutlinedIcon />
              <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'text.primary' }}>
                {headerLabels.backToWallet}
              </Typography>
            </Box>
          </Link>

          <TransactionsFilterModalAction
            locale={locale}
            triggerLabel={headerLabels.filters}
            filterLabels={filterLabels}
            tabOptions={tabOptions}
            accountOptions={accountOptions}
          />
        </Box>
      </Container>
    </Box>
  );
}

