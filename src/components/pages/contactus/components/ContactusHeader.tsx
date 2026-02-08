import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

interface ContactusHeaderProps {
  title: string;
  backHref: string;
  backLabel: string;
}

export default function ContactusHeader({
  title,
  backHref,
  backLabel,
}: ContactusHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        color: 'text.primary',
      }}
    >
      <Link
        href={backHref}
        aria-label={backLabel}
        style={{
          display: 'flex',
          alignItems: 'center',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        <ArrowForwardIcon />
      </Link>
      <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'inherit' }}>
        {title}
      </Typography>
    </Box>
  );
}
