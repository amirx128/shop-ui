import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

interface AboutusHeaderProps {
  title: string;
  backHref: string;
  backLabel: string;
}

export default function AboutusHeader({
  title,
  backHref,
  backLabel,
}: AboutusHeaderProps) {
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
        <ArrowForwardOutlinedIcon />
      </Link>
      <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'inherit' }}>
        {title}
      </Typography>
    </Box>
  );
}
