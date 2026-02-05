'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Image from 'next/image';

interface BankCardProps {
  name: string;
  logoSrc: string;
  selected: boolean;
  onSelect: () => void;
}

export default function BankCard({
  name,
  logoSrc,
  selected,
  onSelect,
}: BankCardProps) {
  const theme = useTheme();
  const selectedBackground = alpha(theme.palette.secondary.main, 0.15);

  return (
    <Box
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
      sx={{
        border: '1px solid',
        borderColor: selected ? 'secondary.main' : 'divider',
        backgroundColor: selected ? selectedBackground : 'transparent',
        borderRadius: 2,
        p: 1.25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        width: '100%',
        cursor: 'pointer',
      }}
    >
      <Image src={logoSrc} alt={name} width={48} height={48} />
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {name}
      </Typography>
    </Box>
  );
}
