'use client';
import { Box, Container, Typography } from '@mui/material';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import Link from 'next/link';

interface CartHeaderProps {
  title: string;
  locale: string;
  backLabel: string;
}

export default function CartHeader({
  title,
  locale,
  backLabel,
}: CartHeaderProps) {
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
            component={Link}
            href={`/${locale}/mobile`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.primary',
            }}
            aria-label={backLabel}
          >
            <ArrowRightAltOutlinedIcon />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
