'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
}

export default function NavItem({ icon: Icon, label, href }: NavItemProps) {
  const t = useTranslations('navbar');
  const pathname = usePathname();
  const isActive = pathname.split('/').at(-1) === href.split('/').at(-1);
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
