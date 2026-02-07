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
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '8px',
        cursor: 'default',
        padding: '4px 12px',
        minHeight: 32,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontSize: '12px',
          textAlign: 'center',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          overflowWrap: 'anywhere',
        }}
      >
        {featureName}
      </Typography>
    </Box>
  );
}
