import { getLocale, getTranslations } from 'next-intl/server';
import { Box } from '@mui/material';
import CartHeader from './components/CartHeader';
import CartBody from './components/CartBody';
import CartBodyClient from './components/CartBodyClient';
import { CartProduct } from './types/cart';
import CartFooter from './components/CartFooter';

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

  const products: CartProduct[] = [
    {
      id: 'cart-1',
      image: '/images/tempproduct.png',
      quantity: 1,
      category: 'تخت و گهواره',
      name: 'تخت نوزاد چوبی مدل رویا',
      price: 1300000,
      variants: [
        { label: 'طرح بندی', value: 'گربه' },
        {
          label: 'رنگ',
          value: 'مشکی',
          color: '#000000',
        },
      ],
    },
    {
      id: 'cart-2',
      image: '/images/tempproduct.png',
      quantity: 2,
      category: 'تخت و گهواره',
      name: 'تخت نوزاد چوبی مدل رویا',
      price: 1300000,
      variants: [
        { label: 'طرح بندی', value: 'گربه' },
        {
          label: 'رنگ',
          value: 'مشکی',
          color: '#000000',
        },
      ],
    },
    {
      id: 'cart-3',
      image: '/images/tempproduct.png',
      quantity: 3,
      category: 'تخت و گهواره',
      name: 'تخت نوزاد چوبی مدل رویا',
      price: 1300000,
      variants: [
        { label: 'طرح بندی', value: 'گربه' },
        {
          label: 'رنگ',
          value: 'مشکی',
          color: '#000000',
        },
      ],
    },
  ];
  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );

  const formattedTotal = `${totalPrice.toLocaleString(locale)} ${translations.currency}`;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CartHeader
        title={translations.title}
        locale={locale}
        backLabel={translations.back}
      />
      <CartBody>
        <CartBodyClient
          initialProducts={products}
          locale={locale}
          currency={translations.currency}
          stepperLabels={{
            increase: translations.increase,
            decrease: translations.decrease,
            remove: translations.remove,
          }}
          productsNeedTitle={translations.productsNeedTitle}
          addToCartText={translations.addToCart}
          summaryLabels={{
            itemsPrice: translations.itemsPrice,
            cartTotal: translations.cartTotal,
            savings: translations.savings,
          }}
          savingsValue={150000}
        />
      </CartBody>
      <CartFooter
        totalLabel={translations.cartTotal}
        totalValue={formattedTotal}
        actionLabel={translations.checkout}
      />
    </Box>
  );
}
