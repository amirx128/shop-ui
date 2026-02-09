'use client';

import { useRouter } from 'next/navigation';
import { Box, Container, Typography } from '@mui/material';
import Button from '@/components/ui/Button';

interface CartFooterProps {
  totalLabel: string;
  totalValue: string;
  actionLabel: string;
  locale: string;
}

export default function CartFooter({
  totalLabel,
  totalValue,
  actionLabel,
  locale,
}: CartFooterProps) {
  const router = useRouter();

  const handleActionClick = () => {
    router.push(`/${locale}/mobile/checkout`);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 72,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'background.default',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.15)',
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 2,
            gap: 2,
          }}
        >
          <Button type="button" onClick={handleActionClick}>
            {actionLabel}
          </Button>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {totalLabel}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: 'secondary.main', fontWeight: 700 }}
            >
              {totalValue}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
