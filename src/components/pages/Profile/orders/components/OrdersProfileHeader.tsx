'use client';

import { Box, Typography } from '@mui/material';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import Link from 'next/link';

interface OrdersProfileHeaderProps {
  title: string;
  backHref: string;
}

export default function OrdersProfileHeader({
  title,
  backHref,
}: OrdersProfileHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        textAlign: 'right',
      }}
    >
      <Box
        component={Link}
        href={backHref}
        aria-label={title}
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'text.primary',
          textDecoration: 'none',
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
