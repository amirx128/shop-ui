import { getTranslations } from 'next-intl/server';
import OrdersProfileContainer from '@/components/pages/Profile/orders/OrdersProfileContainer';

export async function generateMetadata() {
  const t = await getTranslations('profile');
  const title = t('ordersProfile.title');

  return {
    title,
    description: title,
  };
}

export default function OrdersProfilePage() {
  return <OrdersProfileContainer />;
}
