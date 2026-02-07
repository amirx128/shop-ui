'use client';
import { Box, Typography } from '@mui/material';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface OrderDetailHeaderProps {
  title: string;
  backHref: string;
  action?: ReactNode;
}

export default function OrderDetailHeader({
  title,
  backHref,
  action,
}: OrderDetailHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
        <Typography
          sx={{ fontSize: 18, fontWeight: 600, color: 'text.primary' }}
        >
          {title}
        </Typography>
      </Box>
      {action}
    </Box>
  );
}
