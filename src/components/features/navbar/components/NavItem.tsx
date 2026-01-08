'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
}

export default function NavItem({
  icon: Icon,
  label,
  href,
  isActive,
}: NavItemProps) {
  const t = useTranslations('navbar');

  return (
    <Link href={href}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
          color: isActive ? 'secondary.main' : 'text.primary',
          transition: 'color 0.2s ease',
        }}
      >
        <Icon
          sx={{
            fontSize: '24px',
            color: isActive ? 'secondary.main' : 'text.primary',
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: isActive ? 'secondary.main' : 'text.primary',
            fontSize: '0.75rem',
          }}
        >
          {t(label)}
        </Typography>
      </Box>
    </Link>
  );
}
