'use client';

import { Box, Typography } from '@mui/material';

interface PatternItemProps {
  patternName: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function PatternItem({
  patternName,
  isSelected,
  onClick,
}: PatternItemProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 67,
        height: 32,
        border: '1px solid',
        borderColor: isSelected ? 'secondary.main' : 'divider',
        borderRadius: '8px',
        cursor: 'pointer',
        color: isSelected ? 'common.white' : 'text.primary',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontSize: '12px',
          textAlign: 'center',
        }}
      >
        {patternName}
      </Typography>
    </Box>
  );
}
