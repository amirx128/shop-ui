import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

interface AddressesHeaderProps {
  title: string;
  backHref?: string;
  onBackClick?: () => void;
}

export default function AddressesHeader({
  title,
  backHref,
  onBackClick,
}: AddressesHeaderProps) {
  if (onBackClick) {
    return (
      <Box
        component="button"
        type="button"
        onClick={onBackClick}
        sx={{
          border: 'none',
          background: 'none',
          p: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: 'text.primary',
          font: 'inherit',
          cursor: 'pointer',
        }}
      >
        <ArrowForwardOutlinedIcon />
        <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'text.primary' }}>
          {title}
        </Typography>
      </Box>
    );
  }

  if (!backHref) {
    return (
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
    );
  }

  return (
    <Link
      href={backHref}
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
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
  );
}
