import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface CartBodyProps {
  children: ReactNode;
}

export default function CartBody({ children }: CartBodyProps) {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        py: 2,
        pb: '96px',
      }}
    >
      {children}
    </Box>
  );
}
