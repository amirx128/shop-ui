import { getTranslations } from 'next-intl/server';
import OrderDetailContainer from '@/components/pages/Profile/orders/orderDetail/OrderDetailContainer';

export async function generateMetadata() {
  const t = await getTranslations('profile');
  const title = t('orderDetail.title');

  return {
    title,
    description: title,
  };
}

export default function OrderDetailPage() {
  return <OrderDetailContainer />;
}
