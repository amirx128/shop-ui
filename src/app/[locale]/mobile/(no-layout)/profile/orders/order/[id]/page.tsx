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

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderDetailContainer orderId={id} />;
}
