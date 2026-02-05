import { Box, Typography, Link } from '@mui/material';
import { HeadsetMicOutlined } from '@mui/icons-material';
import { useTranslations } from 'next-intl';

const phoneNumber = '02192009332';

export default function SupportInfo() {
  const t = useTranslations('general');

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <HeadsetMicOutlined
        sx={{
          fontSize: 16,
          color: 'common.white',
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: 'common.white',
          fontSize: '0.875rem',
        }}
      >
        {t('supportNumber')}:{' '}
        <Link
          href={`tel:${phoneNumber}`}
          sx={{
            color: 'common.white',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {phoneNumber}
        </Link>
      </Typography>
    </Box>
  );
}
