import { Box } from '@mui/material';
import { ShopBodyProps } from '../types';

export default function ShopBody({ children }: ShopBodyProps) {
  return (
    <Box
      sx={{
        overflowY: 'auto',
        flex: 1,
        py: 1,
      }}
    >
      {children}
    </Box>
  );
}
