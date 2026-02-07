import { Box, Typography } from '@mui/material';
import type { OrderDetailSummaryItem } from '../types/orderDetail';

interface OrderDetailSummaryProps {
  items: OrderDetailSummaryItem[];
}

export default function OrderDetailSummary({
  items,
}: OrderDetailSummaryProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        columnGap: 2,
        rowGap: 1.5,
      }}
    >
      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            gridColumn: item.fullWidth ? '1 / -1' : 'auto',
          }}
        >
          {item.label ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                flexWrap: 'wrap',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  color: 'text.secondary',
                }}
              >
                {item.label}:
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'text.primary',
                }}
              >
                {item.value}
              </Typography>
            </Box>
          ) : (
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              {item.value}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}
