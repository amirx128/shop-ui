import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

interface TransactionDetailSupportFooterProps {
  title: string;
  action: string;
  iconAlt: string;
}

export default function TransactionDetailSupportFooter({
  title,
  action,
  iconAlt,
}: TransactionDetailSupportFooterProps) {
  return (
    <Box
      sx={{
        borderRadius: 1,
        p: '12px',
        backgroundColor: 'rgba(34, 58, 120, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'primary.main' }}>
          {title}
        </Typography>
        <Link
          href={ROUTES.profile.CONTACT_US}
          style={{
            textDecoration: 'none',
            color: 'inherit',
            width: 'fit-content',
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 500, color: 'action.hover' }}>
            {action}
          </Typography>
        </Link>
      </Box>

      <Image src="/logo.svg" alt={iconAlt} width={24} height={24} />
    </Box>
  );
}

