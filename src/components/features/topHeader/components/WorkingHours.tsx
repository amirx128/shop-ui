import { Box, Typography } from '@mui/material';
import { AccessTimeOutlined } from '@mui/icons-material';
import { useTranslations } from 'next-intl';

export default function WorkingHours() {
  const t = useTranslations('general');

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <AccessTimeOutlined
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
        {t('workingHours')}
      </Typography>
    </Box>
  );
}
