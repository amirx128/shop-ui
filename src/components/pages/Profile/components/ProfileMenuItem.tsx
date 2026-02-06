'use client';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Link from 'next/link';
import type { ProfileMenuItem } from '../types/profile';

interface ProfileMenuItemProps {
  item: ProfileMenuItem;
}

export default function ProfileMenuItem({ item }: ProfileMenuItemProps) {
  const Icon = item.icon;
  const content = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 1.5,
        textDecoration: 'none',
        color: 'inherit',
        transition: 'background-color 0.2s ease',
        ...(item.href && {
          '&:hover': {
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.06),
          },
        }),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey.100',
          }}
        >
          <Icon
            sx={{
              fontSize: 22,
              color: 'text.secondary',
            }}
          />
        </Box>
        <Typography
          sx={{
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          {item.title}
        </Typography>
      </Box>
      <ChevronLeftIcon sx={{ color: 'text.disabled' }} />
    </Box>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {content}
      </Link>
    );
  }

  return content;
}
