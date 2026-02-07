'use client';

import { Box, Typography } from '@mui/material';

interface ColorItemProps {
  colorName: string;
  colorCode: string;
  colorId: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function ColorItem({
  colorName,
  colorCode,
  colorId,
  isSelected,
  onClick,
}: ColorItemProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        paddingX: 2,
        paddingY: 1,
        border: '1px solid',
        borderColor: isSelected ? 'secondary.main' : 'divider',
        borderRadius: '8px',
        cursor: 'pointer',
        color: isSelected ? 'common.white' : 'text.primary',
      }}
    >
      <Box
        sx={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          backgroundColor: colorCode,
          border: '1px solid',
          borderColor: 'divider',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.15,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: '14px',
          }}
        >
          {colorName}
        </Typography>
        
      </Box>
    </Box>
  );
}
