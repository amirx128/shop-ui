import { getTranslations } from 'next-intl/server';
import OrdersProfileClient from './components/OrdersProfileClient';
import type { OrdersProfileStatus } from './types/ordersProfile';
import { ROUTES } from '@/lib/routes';

export default async function OrdersProfileContainer() {
  const t = await getTranslations('profile');

  const statusLabels: Record<OrdersProfileStatus, string> = {
    processing: t('ordersProfile.tabs.processing'),
    delivered: t('ordersProfile.tabs.delivered'),
    returned: t('ordersProfile.tabs.returned'),
    canceled: t('ordersProfile.tabs.canceled'),
  };

  const labels = {
    orderCode: t('ordersProfile.orderCodeLabel'),
    payableAmount: t('ordersProfile.payableAmountLabel'),
    currency: t('ordersProfile.currency'),
    details: t('ordersProfile.detailsLabel'),
  };

  return (
    <OrdersProfileClient
      title={t('ordersProfile.title')}
      backHref={ROUTES.profile.BASE}
      statusLabels={statusLabels}
      labels={labels}
      itemAlt={t('ordersProfile.itemAlt')}
    />
  );
}
