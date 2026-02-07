'use client';

import { Box, Typography, Container } from '@mui/material';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import { useRouter } from 'next/navigation';

interface ProductDetailHeaderProps {
  headerText: string;
}

export default function ProductDetailHeader({
  headerText,
}: ProductDetailHeaderProps) {
  const router = useRouter();

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            py: 2,
          }}
        >
          <Box
            onClick={() => router.push('/fa/mobile')}
            sx={{ cursor: 'pointer' }}
          >
            <ArrowRightAltOutlinedIcon />
          </Box>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
            }}
          >
            {headerText}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
