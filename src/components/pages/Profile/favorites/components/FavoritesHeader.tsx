import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';

interface FavoritesHeaderProps {
  title: string;
  backHref: string;
}

export default function FavoritesHeader({ title, backHref }: FavoritesHeaderProps) {
  return (
    <Box
      sx={{
        py: 2,
        borderBottom: 1,
        borderColor: 'divider',
        backgroundColor: 'background.default',
        flexShrink: 0,
      }}
    >
      <Container>
        <Link href={backHref} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'text.primary',
            }}
          >
            <ArrowForwardOutlinedIcon />
            <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'text.primary' }}>
              {title}
            </Typography>
          </Box>
        </Link>
      </Container>
    </Box>
  );
}

