'use client';

import { Box, Container, Typography } from '@mui/material';
import CheckoutFooter from './CheckoutFooter';

interface CheckoutStepPlaceholderClientProps {
  title: string;
  placeholder: string;
  totalLabel: string;
  totalValue: string;
  actionLabel: string;
}

export default function CheckoutStepPlaceholderClient({
  title,
  placeholder,
  totalLabel,
  totalValue,
  actionLabel,
}: CheckoutStepPlaceholderClientProps) {
  return (
    <>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            py: 6,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {placeholder}
          </Typography>
        </Box>
      </Container>

      <CheckoutFooter
        totalLabel={totalLabel}
        totalValue={totalValue}
        actionLabel={actionLabel}
        onAction={() => {}}
        disabled
      />
    </>
  );
}
