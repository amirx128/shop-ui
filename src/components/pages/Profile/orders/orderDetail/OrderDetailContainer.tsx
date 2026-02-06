import { Box, Container } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import { ROUTES } from '@/lib/routes';
import OrderDetailHeader from './components/OrderDetailHeader';
import CancelOrderAction from './components/CancelOrderAction';
import ProcessingOrderSuccessModal from './components/ProcessingOrderSuccessModal';
import OrderDetailSummary from './components/OrderDetailSummary';
import OrderDetailProducts from './components/OrderDetailProducts';
import type {
  CancelOrderLabels,
  DeliveredReviewModalLabels,
  OrderDetailStatus,
  OrderDetailSummaryItem,
  ProcessingOrderModalLabels,
} from './types/orderDetail';
import type {
  ProductOrderCartLabels,
  ProductOrderCartProduct,
} from '@/components/ui/ProductOrderCart';

interface OrderDetailContainerProps {
  orderId: string;
}

export default async function OrderDetailContainer({
  orderId,
}: OrderDetailContainerProps) {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('profile'),
  ]);

  const orderStatusById: Record<string, OrderDetailStatus> = {
    '1': 'processing',
    '2': 'delivered',
    '3': 'returned',
    '4': 'canceled',
  };
  const orderStatus = orderStatusById[orderId] ?? 'delivered';
  const isProcessingOrder = orderStatus === 'processing';
  const isDeliveredOrder = orderStatus === 'delivered';
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
  const processingOrderModalLabels: ProcessingOrderModalLabels = {
    title: t('orderDetail.processingModal.title'),
    description: t('orderDetail.processingModal.description'),
    action: t('orderDetail.processingModal.action'),
  };
  const deliveredReviewModalLabels: DeliveredReviewModalLabels = {
    action: t('orderDetail.review.action'),
    rateTitle: t('orderDetail.review.rateTitle'),
    rateDescription: t('orderDetail.review.rateDescription'),
    commentPlaceholder: t('orderDetail.review.commentPlaceholder'),
    submit: t('orderDetail.review.submit'),
    cancel: t('orderDetail.review.cancel'),
    successTitle: t('orderDetail.review.successTitle'),
    successDescription: t('orderDetail.review.successDescription'),
    acknowledge: t('orderDetail.review.acknowledge'),
  };

  const summaryItems: OrderDetailSummaryItem[] =
    orderStatus === 'returned'
      ? [
          {
            id: 'return-request-date',
            label: t('orderDetail.returnFields.returnRequestDate'),
            value: isFaLocale ? '۱۰ مهر ۱۴۰۴' : 'Oct 2, 2025',
          },
          {
            id: 'return-method',
            label: t('orderDetail.returnFields.returnMethod'),
            value: isFaLocale ? 'پست پیشتاز' : 'Express post',
          },
          {
            id: 'return-receiver-1',
            label: t('orderDetail.fields.receiver'),
            value: isFaLocale ? 'باران اکبری' : 'Baran Akbari',
          },
          {
            id: 'refunded-amount',
            label: t('orderDetail.returnFields.refundedAmount'),
            value: `${numberFormatter.format(1123020)} ${currencyLabel}`,
          },
          {
            id: 'return-receiver-2',
            label: t('orderDetail.fields.receiver'),
            value: isFaLocale ? 'باران اکبری' : 'Baran Akbari',
          },
          {
            id: 'return-phone',
            label: t('orderDetail.fields.phone'),
            value: isFaLocale ? '۰۹۱۲۴۹۳۷۴۴۶' : '09124937446',
          },
          {
            id: 'return-address',
            label: t('orderDetail.fields.address'),
            value: isFaLocale
              ? 'تهران ، رسالت ، خیابان کرد ، کوچه اول ، پلاک ۱، واحد ۴'
              : 'Tehran, Resalat, Kord St, First Alley, No. 1, Unit 4',
            fullWidth: true,
          },
        ]
      : orderStatus === 'canceled'
        ? [
            {
              id: 'canceled-date',
              value: isFaLocale ? '۵ مهر ۱۴۰۳' : 'Sep 26, 2024',
            },
            {
              id: 'canceled-order-code',
              label: t('orderDetail.fields.orderCode'),
              value: isFaLocale ? '۸۵۹۰۳۲۶' : '8590326',
            },
            {
              id: 'canceled-shipping-cost',
              label: t('orderDetail.fields.shippingCost'),
              value: isFaLocale ? 'رایگان' : 'Free',
            },
            {
              id: 'canceled-order-amount',
              label: t('orderDetail.canceledFields.orderAmount'),
              value: `${numberFormatter.format(1123020)} ${currencyLabel}`,
            },
            {
              id: 'canceled-delivery-time',
              label: t('orderDetail.fields.deliveryTime'),
              value: isFaLocale
                ? 'شنبه ۲۵ مهر ۱۴۰۴'
                : 'Saturday, Oct 17, 2025',
            },
          ]
      : [
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
            action={
              isProcessingOrder ? (
                <CancelOrderAction labels={cancelLabels} />
              ) : undefined
            }
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
            <OrderDetailProducts
              products={products}
              labels={productLabels}
              showReviewAction={isDeliveredOrder}
              reviewLabels={deliveredReviewModalLabels}
            />
          </Container>
        </Box>
      </Box>

      {isProcessingOrder ? (
        <ProcessingOrderSuccessModal labels={processingOrderModalLabels} />
      ) : null}
    </Box>
  );
}
