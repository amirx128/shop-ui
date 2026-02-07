import { Box, Container } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import FavoritesHeader from './components/FavoritesHeader';
import FavoritesProductsList from './components/FavoritesProductsList';
import type { FavoriteProduct } from './types/favorites';
import { ROUTES } from '@/lib/routes';

export default async function FavoritesContainer() {
  const [locale, profileT, generalT] = await Promise.all([
    getLocale(),
    getTranslations('profile'),
    getTranslations('general'),
  ]);

  const isFaLocale = locale.startsWith('fa');
  const productCategory = isFaLocale ? 'تخت و گهواره' : 'Crib & Bassinet';
  const productName = isFaLocale
    ? 'تخت نوزاد چوبی مدل رویا'
    : 'Wooden Baby Crib, Roya Model';
  const productImage = '/images/tempproduct.png';

  const products: FavoriteProduct[] = Array.from({ length: 10 }, (_, index) => ({
    id: `favorite-product-${index + 1}`,
    image: productImage,
    category: productCategory,
    name: productName,
    price: 1256000,
    colors: ['#52525B', '#898BFA', '#FF4C8B', '#E16203', '#27272A'],
  }));

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
          <FavoritesProductsList
            products={products}
            addToCartText={generalT('addToCart')}
          />
        </Container>
      </Box>
    </Box>
  );
}
