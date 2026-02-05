'use client';
import { Box, Container } from '@mui/material';
import SupportInfo from './components/SupportInfo';
import WorkingHours from './components/WorkingHours';

export default function TopHeader() {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'primary.main',
        py: 1,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <SupportInfo />
        <WorkingHours />
      </Container>
    </Box>
  );
}
