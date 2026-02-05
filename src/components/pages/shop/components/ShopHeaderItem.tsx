'use client';

import { Box, SxProps, Theme } from '@mui/material';
import { ShopHeaderItemProps } from '../types';

export default function ShopHeaderItem({
  icon,
  label,
  isActive,
  disableHover,
  onClick,
}: ShopHeaderItemProps) {
  const baseSx: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    padding: 1,
    borderRadius: 1,
    border: 1,
    borderColor: 'divider',
    color: 'text.primary',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease-in-out',
  };

  const activeSx: SxProps<Theme> = {
    borderColor: 'action.hover',
    color: 'action.hover',
  };

  const hoverSx: SxProps<Theme> = {
    '&:hover': {
      borderColor: 'action.hover',
      color: 'action.hover',
    },
  };

  let sx: SxProps<Theme> = baseSx;

  if (isActive) {
    sx = { ...baseSx, ...activeSx };
  } else if (!disableHover) {
    sx = { ...baseSx, ...hoverSx };
  }

  return (
    <Box sx={sx} onClick={onClick}>
      {icon}
      <Box component="span">{label}</Box>
    </Box>
  );
}
