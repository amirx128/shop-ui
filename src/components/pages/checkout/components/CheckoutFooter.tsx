'use client';

import { Box, Container, Typography } from '@mui/material';
import Button from '@/components/ui/Button';
import CheckoutSummarySection from './CheckoutSummarySection';
import { SummaryRow } from '../types/checkout';

interface CheckoutFooterProps {
  totalLabel: string;
  totalValue: string;
  actionLabel: string;
  onAction: () => void;
  disabled?: boolean;
  summaryRows?: SummaryRow[];
}

export default function CheckoutFooter({
  totalLabel,
  totalValue,
  actionLabel,
  onAction,
  disabled,
  summaryRows,
}: CheckoutFooterProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 72,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'background.default',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.15)',
      }}
    >
      {summaryRows && summaryRows.length > 0 && (
        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 2 }}>
          <Container>
            <CheckoutSummarySection rows={summaryRows} dense />
          </Container>
        </Box>
      )}
      <Container>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 2,
            gap: 2,
          }}
        >
          <Button onClick={onAction} disabled={disabled}>
            {actionLabel}
          </Button>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {totalLabel}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: 'text.primary', fontWeight: 700 }}
            >
              {totalValue}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
