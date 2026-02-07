'use client';

import { Box, Typography } from '@mui/material';

interface PropertyOptionItemProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function PropertyOptionItem({
  label,
  isSelected,
  onClick,
}: PropertyOptionItemProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        minWidth: 80,
        maxWidth: 140,
        px: 1.5,
        py: 0.5,
        border: '1px solid',
        borderColor: isSelected ? 'secondary.main' : 'divider',
        borderRadius: '8px',
        cursor: 'pointer',
        color: isSelected ? 'common.white' : 'text.primary',
        whiteSpace: 'normal',
        textAlign: 'center',
        lineHeight: 1.3,
        wordBreak: 'break-word',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: '12px',
          textAlign: 'center',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
