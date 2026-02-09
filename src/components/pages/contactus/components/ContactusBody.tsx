import type { ReactNode } from 'react';
import { Box, Container, Typography } from '@mui/material';

interface ContactusBodyProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function ContactusBody({
  title,
  description,
  children,
}: ContactusBodyProps) {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
      }}
    >
      <Container
        sx={{
          py: 3,
          pb: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography sx={{ fontSize: 20, fontWeight: 700, color: 'text.primary' }}>
              {title}
            </Typography>
            <Typography sx={{ fontSize: 14, color: 'text.secondary', lineHeight: 1.9 }}>
              {description}
            </Typography>
          </Box>
          {children}
        </Box>
      </Container>
    </Box>
  );
}
