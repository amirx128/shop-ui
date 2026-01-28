import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface CheckoutBodyProps {
  children: ReactNode;
}

export default function CheckoutBody({ children }: CheckoutBodyProps) {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        py: 2,
        pb: '120px',
      }}
    >
      {children}
    </Box>
  );
}
