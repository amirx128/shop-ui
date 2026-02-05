'use client';

import { Box, Typography } from '@mui/material';

interface FeatureItemProps {
  featureName: string;
}

export default function FeatureItem({ featureName }: FeatureItemProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 67,
        height: 32,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '8px',
        cursor: 'default',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontSize: '12px',
          textAlign: 'center',
        }}
      >
        {featureName}
      </Typography>
    </Box>
  );
}
