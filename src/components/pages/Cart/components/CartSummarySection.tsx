import { Box, Typography } from '@mui/material';

interface SummaryRow {
  title: string;
  value: string;
  color?: string;
}

interface CartSummarySectionProps {
  rows: SummaryRow[];
}

export default function CartSummarySection({ rows }: CartSummarySectionProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        mt: 3,
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
