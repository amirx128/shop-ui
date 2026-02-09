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
import { ORDERS_API_URL } from '@/lib/orders';
import type {
  CartAddressDto,
  ShoppingCartDetail,
} from '@/types/shoppingCartDetail';

const parseUtcDate = (value?: string | null): Date | null => {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatAddress = (address?: CartAddressDto | null): string | null => {
  if (!address) {
    return null;
  }

  const segments = [
    address.street,
    address.address,
    address.alley,
    address.plaque,
    address.unit,
  ].filter((segment): segment is string => Boolean(segment));

  return segments.join(', ') || null;
};

async function fetchShoppingCartDetail(orderId: string): Promise<ShoppingCartDetail> {
  const response = await fetch(
    `${ORDERS_API_URL}/api/shopping-carts/${encodeURIComponent(orderId)}/detail`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Unable to load order detail.');
  }

  return (await response.json()) as ShoppingCartDetail;
}

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

  const cartDetail = await fetchShoppingCartDetail(orderId);

  const isFaLocale = locale.startsWith('fa');
  const numberFormatter = new Intl.NumberFormat(locale);
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const currencyLabel = isFaLocale ? 'تومان' : 'Toman';

  const orderStatus: OrderDetailStatus = cartDetail.isPaid ? 'delivered' : 'processing';
  const isProcessingOrder = orderStatus === 'processing';
  const isDeliveredOrder = orderStatus === 'delivered';

  const createdAtDate = parseUtcDate(cartDetail.createdAtUtc) ?? new Date();
  const deliveryDate =
    parseUtcDate(cartDetail.modifiedAtUtc) ??
    parseUtcDate(cartDetail.paidAtUtc) ??
    parseUtcDate(cartDetail.createdAtUtc);

  const orderCode = cartDetail.cartCode?.trim() || cartDetail.cartId;
  const shippingAmount = cartDetail.shippingAmount;
  const shippingCostValue =
    shippingAmount != null && shippingAmount > 0
      ? `${numberFormatter.format(shippingAmount)} ${currencyLabel}`
      : isFaLocale
        ? 'رایگان'
        : 'Free';
  const payableAmount = cartDetail.paymentAmount ?? cartDetail.itemsTotal;
  const payableValue = `${numberFormatter.format(payableAmount)} ${currencyLabel}`;
  const shippingMethodValue = isFaLocale ? 'پست پیشتاز' : 'Express post';
  const receiverValue =
    cartDetail.customerDisplayName ??
    cartDetail.customerAddress?.title ??
    cartDetail.customerId ??
    '—';
  const phoneValue = cartDetail.customerPhoneNumber ?? '—';
  const addressValue = formatAddress(cartDetail.customerAddress) ?? '—';

  const summaryItems: OrderDetailSummaryItem[] = [
    {
      id: 'order-date',
      value: dateFormatter.format(createdAtDate),
    },
    {
      id: 'order-code',
      label: t('orderDetail.fields.orderCode'),
      value: orderCode,
    },
    {
      id: 'shipping-cost',
      label: t('orderDetail.fields.shippingCost'),
      value: shippingCostValue,
    },
    {
      id: 'payable-amount',
      label: t('orderDetail.fields.payableAmount'),
      value: payableValue,
    },
    {
      id: 'shipping-method',
      label: t('orderDetail.fields.shippingMethod'),
      value: shippingMethodValue,
    },
    {
      id: 'delivery-time',
      label: t('orderDetail.fields.deliveryTime'),
      value: deliveryDate ? dateFormatter.format(deliveryDate) : '—',
    },
    {
      id: 'receiver',
      label: t('orderDetail.fields.receiver'),
      value: receiverValue,
    },
    {
      id: 'phone',
      label: t('orderDetail.fields.phone'),
      value: phoneValue,
    },
    {
      id: 'address',
      label: t('orderDetail.fields.address'),
      value: addressValue,
      fullWidth: true,
    },
  ];

  const productLabels: ProductOrderCartLabels = {
    color: t('orderDetail.product.color'),
    quantity: t('orderDetail.product.quantity'),
    price: t('orderDetail.product.price'),
  };

  const products: ProductOrderCartProduct[] = cartDetail.items.map((item) => ({
    id: item.productId,
    title:
      item.name ?? (isFaLocale ? 'محصول بدون نام' : 'Unnamed product'),
    color: {
      name: item.colorName ?? (isFaLocale ? 'انتخاب‌شده' : 'Selected'),
      hex: item.colorHex || '#d4d4d8',
    },
    quantity: isFaLocale ? `${item.quantity} عدد` : `${item.quantity} item`,
    price: `${numberFormatter.format(item.rowPrice)} ${currencyLabel}`,
    imageSrc: item.imageUrl ?? '/images/tempProduct.png',
    imageAlt: item.name ?? (isFaLocale ? 'تصویر محصول' : 'Product image'),
  }));

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
