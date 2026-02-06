'use client';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

interface WalletHeaderProps {
  title: string;
  backHref: string;
}

export default function WalletHeader({ title, backHref }: WalletHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Box
        component={Link}
        href={backHref}
        aria-label={title}
        sx={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'text.primary',
        }}
      >
        <ArrowForwardOutlinedIcon />
      </Box>
      <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'text.primary' }}>
        {title}
      </Typography>
    </Box>
  );
}
