import { Box, Container } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import FavoritesHeader from './components/FavoritesHeader';
import FavoritesContent from './components/FavoritesContent';
import { ROUTES } from '@/lib/routes';

export default async function FavoritesContainer() {
  const [locale, profileT, generalT] = await Promise.all([
    getLocale(),
    getTranslations('profile'),
    getTranslations('general'),
  ]);

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <FavoritesHeader title={profileT('items.favorites')} backHref={ROUTES.profile.BASE} />

      <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <Container sx={{ py: 2 }}>
          <FavoritesContent addToCartText={generalT('addToCart')} />
        </Container>
      </Box>
    </Box>
  );
}
