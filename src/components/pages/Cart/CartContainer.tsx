import { getLocale, getTranslations } from 'next-intl/server';
import { Box } from '@mui/material';
import CartHeader from './components/CartHeader';
import CartContent from './components/CartContent';

export default async function CartContainer() {
  const [locale, t] = await Promise.all([getLocale(), getTranslations('cart')]);

  const translations = {
    title: t('title'),
    back: t('back'),
    currency: t('currency'),
    increase: t('increase'),
    decrease: t('decrease'),
    remove: t('remove'),
    productsNeedTitle: t('productsNeedTitle'),
    addToCart: t('addToCart'),
    itemsPrice: t('itemsPrice'),
    cartTotal: t('cartTotal'),
    savings: t('savings'),
    checkout: t('checkout'),
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CartHeader
        title={translations.title}
        locale={locale}
        backLabel={translations.back}
      />
      <CartContent
        locale={locale}
        currency={translations.currency}
        addToCartText={translations.addToCart}
        productsNeedTitle={translations.productsNeedTitle}
        summaryLabels={{
          itemsPrice: translations.itemsPrice,
          cartTotal: translations.cartTotal,
          savings: translations.savings,
        }}
        stepperLabels={{
          increase: translations.increase,
          decrease: translations.decrease,
          remove: translations.remove,
        }}
        totalLabel={translations.cartTotal}
        actionLabel={translations.checkout}
      />
    </Box>
  );
}
