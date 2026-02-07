import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

interface TransactionDetailHeaderProps {
  title: string;
  backHref: string;
}

export default function TransactionDetailHeader({
  title,
  backHref,
}: TransactionDetailHeaderProps) {
  return (
    <Link
      href={backHref}
      aria-label={title}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.primary' }}>
        <ArrowForwardOutlinedIcon />
        <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'inherit' }}>
          {title}
        </Typography>
      </Box>
    </Link>
  );
}

