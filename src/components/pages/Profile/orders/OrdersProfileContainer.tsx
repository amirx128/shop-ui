import { getLocale, getTranslations } from 'next-intl/server';
import OrdersProfileClient from './components/OrdersProfileClient';
import type {
  OrdersProfileOrder,
  OrdersProfileStatus,
  OrdersProfileTab,
} from './types/ordersProfile';
import { ROUTES } from '@/lib/routes';

interface RawOrderData {
  id: string;
  code?: string;
  dateFa: string;
  dateEn: string;
  amount: number;
  items: number;
}

export default async function OrdersProfileContainer() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('profile'),
  ]);

  const isFaLocale = locale.startsWith('fa');
  const numberFormatter = new Intl.NumberFormat(locale);

  const statusLabels: Record<OrdersProfileStatus, string> = {
    processing: t('ordersProfile.tabs.processing'),
    delivered: t('ordersProfile.tabs.delivered'),
    returned: t('ordersProfile.tabs.returned'),
    canceled: t('ordersProfile.tabs.canceled'),
  };

  const itemAlt = t('ordersProfile.itemAlt');

  const createOrder = (
    status: OrdersProfileStatus,
    data: RawOrderData
  ): OrdersProfileOrder => ({
    id: data.id,
    date: isFaLocale ? data.dateFa : data.dateEn,
    code: data.code ?? data.id,
    status,
    statusLabel: statusLabels[status],
    amount: numberFormatter.format(data.amount),
    items: Array.from({ length: data.items }, (_, index) => ({
      id: `${data.id}-${index + 1}`,
      src: '/images/tempProduct.png',
      alt: `${itemAlt} ${index + 1}`,
    })),
  });

  const ordersByStatus: Record<OrdersProfileStatus, OrdersProfileOrder[]> = {
    processing: [
      createOrder('processing', {
        id: '1212121',
        dateFa: '5 مهر 1404',
        dateEn: 'Sep 27, 2025',
        amount: 1800000,
        items: 3,
      }),
      createOrder('processing', {
        id: '3421987',
        dateFa: '12 مهر 1404',
        dateEn: 'Oct 4, 2025',
        amount: 2650000,
        items: 4,
      }),
      createOrder('processing', {
        id: '7788123',
        dateFa: '20 مهر 1404',
        dateEn: 'Oct 12, 2025',
        amount: 980000,
        items: 2,
      }),
    ],
    delivered: [
      createOrder('delivered', {
        id: '4551122',
        dateFa: '2 مهر 1404',
        dateEn: 'Sep 24, 2025',
        amount: 3200000,
        items: 5,
      }),
    ],
    returned: [
      createOrder('returned', {
        id: '8855441',
        dateFa: '15 شهریور 1404',
        dateEn: 'Sep 6, 2025',
        amount: 1200000,
        items: 3,
      }),
      createOrder('returned', {
        id: '6633991',
        dateFa: '22 شهریور 1404',
        dateEn: 'Sep 13, 2025',
        amount: 540000,
        items: 2,
      }),
    ],
    canceled: [
      createOrder('canceled', {
        id: '9900112',
        dateFa: '30 شهریور 1404',
        dateEn: 'Sep 21, 2025',
        amount: 1450000,
        items: 3,
      }),
      createOrder('canceled', {
        id: '7700221',
        dateFa: '8 مهر 1404',
        dateEn: 'Sep 30, 2025',
        amount: 2100000,
        items: 4,
      }),
      createOrder('canceled', {
        id: '5522100',
        dateFa: '18 مهر 1404',
        dateEn: 'Oct 10, 2025',
        amount: 760000,
        items: 2,
      }),
    ],
  };

  const tabs: OrdersProfileTab[] = [
    {
      key: 'processing',
      label: statusLabels.processing,
      count: ordersByStatus.processing.length,
    },
    {
      key: 'delivered',
      label: statusLabels.delivered,
      count: ordersByStatus.delivered.length,
    },
    {
      key: 'returned',
      label: statusLabels.returned,
      count: ordersByStatus.returned.length,
    },
    {
      key: 'canceled',
      label: statusLabels.canceled,
      count: ordersByStatus.canceled.length,
    },
  ];

  return (
    <OrdersProfileClient
      title={t('ordersProfile.title')}
      backHref={ROUTES.profile.BASE}
      tabs={tabs}
      ordersByStatus={ordersByStatus}
      labels={{
        orderCode: t('ordersProfile.orderCodeLabel'),
        payableAmount: t('ordersProfile.payableAmountLabel'),
        currency: t('ordersProfile.currency'),
        details: t('ordersProfile.detailsLabel'),
      }}
    />
  );
}
