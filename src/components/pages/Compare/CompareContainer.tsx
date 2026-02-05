import { getLocale, getTranslations } from 'next-intl/server';
import { Box, Container } from '@mui/material';
import CompareListClient from './components/CompareListClient';
import { CompareProduct } from './types/compare';

export default async function CompareContainer() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('compare'),
  ]);

  const translations = {
    remove: t('remove'),
    addToCart: t('addToCart'),
    currency: t('currency'),
    sample: {
      category: t('sample.category'),
      name: t('sample.name'),
      feature: t('sample.feature'),
    },
  };

  const features = Array.from({ length: 5 }, () => translations.sample.feature);

  const products: CompareProduct[] = Array.from({ length: 3 }, (_, index) => ({
    id: `compare-${index + 1}`,
    image: '/tempproduct.png',
    category: translations.sample.category,
    name: translations.sample.name,
    originalPrice: 1850000,
    price: 1000000,
    color: '#DDEBFC',
    features,
  }));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container sx={{ py: 2 }}>
        <CompareListClient
          initialProducts={products}
          locale={locale}
          translations={{
            remove: translations.remove,
            addToCart: translations.addToCart,
            currency: translations.currency,
          }}
        />
      </Container>
    </Box>
  );
}
