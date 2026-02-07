'use client';

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
}

export default function NavItem({ icon: Icon, label, href }: NavItemProps) {
  const t = useTranslations('navbar');
  const pathname = usePathname();
  const locale = useLocale();
  const deviceSegments = new Set(['mobile', 'desktop']);
  const normalizePath = (path: string) => {
    if (!path || path === '#') return '#';
    const withoutLocale = path.startsWith(`/${locale}`)
      ? path.slice(locale.length + 1)
      : path;
    const segments = withoutLocale.split('/').filter(Boolean);
    if (segments.length > 0 && deviceSegments.has(segments[0])) {
      segments.shift();
    }
    const normalized = `/${segments.join('/')}`;
    if (normalized === '/') return '/';
    return normalized.replace(/\/+$/g, '');
  };
  const normalizedPathname = normalizePath(pathname);
  const normalizedHref = normalizePath(href);
  const isActive =
    normalizedHref !== '#' &&
    (normalizedHref === '/'
      ? normalizedPathname === '/'
      : normalizedPathname === normalizedHref ||
        normalizedPathname.startsWith(`${normalizedHref}/`));
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
