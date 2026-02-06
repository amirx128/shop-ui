import { Box, Container } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import { ROUTES } from '@/lib/routes';
import OrderDetailHeader from './components/OrderDetailHeader';
import CancelOrderAction from './components/CancelOrderAction';
import OrderDetailSummary from './components/OrderDetailSummary';
import OrderDetailProducts from './components/OrderDetailProducts';
import type {
  CancelOrderLabels,
  OrderDetailSummaryItem,
} from './types/orderDetail';
import type {
  ProductOrderCartLabels,
  ProductOrderCartProduct,
} from '@/components/ui/ProductOrderCart';

export default async function OrderDetailContainer() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('profile'),
  ]);

  const isFaLocale = locale.startsWith('fa');
  const numberFormatter = new Intl.NumberFormat(locale);
  const currencyLabel = isFaLocale ? 'تومان' : 'Toman';
  const orderCode = '65758595';

  const cancelLabels: CancelOrderLabels = {
    action: t('orderDetail.cancelAction'),
    modalTitle: t('orderDetail.modal.title'),
    modalQuestion: t('orderDetail.modal.question'),
    confirm: t('orderDetail.modal.confirm'),
    dismiss: t('orderDetail.modal.dismiss'),
  };

  const summaryItems: OrderDetailSummaryItem[] = [
    {
      id: 'order-date',
      value: isFaLocale ? '5 مهر 1404' : 'Sep 27, 2025',
    },
    {
      id: 'order-code',
      label: t('orderDetail.fields.orderCode'),
      value: orderCode,
    },
    {
      id: 'shipping-cost',
      label: t('orderDetail.fields.shippingCost'),
      value: isFaLocale ? 'رایگان' : 'Free',
    },
    {
      id: 'payable-amount',
      label: t('orderDetail.fields.payableAmount'),
      value: `${numberFormatter.format(1850000)} ${currencyLabel}`,
    },
    {
      id: 'shipping-method',
      label: t('orderDetail.fields.shippingMethod'),
      value: isFaLocale ? 'پست پیشتاز' : 'Express post',
    },
    {
      id: 'delivery-time',
      label: t('orderDetail.fields.deliveryTime'),
      value: isFaLocale ? '25 مهر 1404' : 'Oct 17, 2025',
    },
    {
      id: 'receiver',
      label: t('orderDetail.fields.receiver'),
      value: isFaLocale ? 'باران اکبری' : 'Baran Akbari',
    },
    {
      id: 'phone',
      label: t('orderDetail.fields.phone'),
      value: '09121234567',
    },
    {
      id: 'address',
      label: t('orderDetail.fields.address'),
      value: isFaLocale
        ? 'تهران ، رسالت ، خیابان کرد ، کوچه اول ، پلاک ۱، واحد ۴'
        : 'Tehran, Resalat, Kord St, First Alley, No. 1, Unit 4',
      fullWidth: true,
    },
  ];

  const productLabels: ProductOrderCartLabels = {
    color: t('orderDetail.product.color'),
    quantity: t('orderDetail.product.quantity'),
    price: t('orderDetail.product.price'),
  };

  const products: ProductOrderCartProduct[] = Array.from(
    { length: 3 },
    (_, index) => ({
      id: `product-${index + 1}`,
      title: isFaLocale
        ? 'آغوشی سوئیسی مخمل کبریتی آرامیس کد ۶۰۰۵'
        : 'Swiss corduroy baby carrier Aramis 6005',
      color: {
        name: isFaLocale ? 'مشکی' : 'Black',
        hex: '#000000',
      },
      quantity: isFaLocale ? '1 عدد' : '1 item',
      price: `${numberFormatter.format(18500000)} ${currencyLabel}`,
      imageSrc: '/images/tempProduct.png',
      imageAlt: isFaLocale ? 'تصویر محصول' : 'Product image',
    }),
  );

  const title = `${t('orderDetail.title')} ${orderCode}`;

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          py: 2,
          flexShrink: 0,
          backgroundColor: 'background.default',
        }}
      >
        <Container>
          <OrderDetailHeader
            title={title}
            backHref={ROUTES.profile.ORDERS}
            action={<CancelOrderAction labels={cancelLabels} />}
          />
        </Container>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            py: 2,
            backgroundColor: 'rgba(255, 117, 67, 0.05)',
          }}
        >
          <Container>
            <OrderDetailSummary items={summaryItems} />
          </Container>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            minHeight: 0,
          }}
        >
          <Container sx={{ py: 2 }}>
            <OrderDetailProducts products={products} labels={productLabels} />
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
