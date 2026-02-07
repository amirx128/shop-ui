import { Box, Typography } from '@mui/material';

interface TransactionDetailInfoItemProps {
  label: string;
  value: string;
}

export default function TransactionDetailInfoItem({
  label,
  value,
}: TransactionDetailInfoItemProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{label}</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'text.primary' }}>
        {value}
      </Typography>
    </Box>
  );
}

