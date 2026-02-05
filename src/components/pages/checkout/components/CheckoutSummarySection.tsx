'use client';

import { Box, Typography } from '@mui/material';
import { SummaryRow } from '../types/checkout';

interface CheckoutSummarySectionProps {
  rows: SummaryRow[];
  dense?: boolean;
}

export default function CheckoutSummarySection({
  rows,
  dense = false,
}: CheckoutSummarySectionProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        mt: dense ? 0 : 3,
      }}
    >
      {rows.map((row) => (
        <Box
          key={row.title}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" sx={{ color: row.color || 'text.primary' }}>
            {row.title}
          </Typography>
          <Typography variant="body2" sx={{ color: row.color || 'text.primary' }}>
            {row.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
