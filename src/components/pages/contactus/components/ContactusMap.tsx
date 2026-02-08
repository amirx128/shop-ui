'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';

interface ContactusMapProps {
  popupLabel: string;
  loadingLabel: string;
  loadingAlt: string;
}

const DynamicMap = dynamic(() => import('./ContactusLeafletMapClient'), {
  ssr: false,
});

export default function ContactusMap({
  popupLabel,
  loadingLabel,
  loadingAlt,
}: ContactusMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Box
        sx={{
          width: '100%',
          height: 182,
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Image
          src="/images/home/heroBg.png"
          alt={loadingAlt}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          style={{ objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            px: 2,
          }}
        >
          <Typography sx={{ fontSize: 13, color: 'common.white', fontWeight: 500 }}>
            {loadingLabel}
          </Typography>
        </Box>
      </Box>
    );
  }

  return <DynamicMap popupLabel={popupLabel} />;
}
