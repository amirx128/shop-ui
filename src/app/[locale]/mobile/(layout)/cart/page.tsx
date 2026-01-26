import { getTranslations } from 'next-intl/server';
import CartContainer from '@/components/pages/Cart/CartContainer';

export async function generateMetadata() {
  const t = await getTranslations('cart');
  const title = t('title');
  return {
    title,
    description: title,
  };
}

export default function CartPage() {
  return <CartContainer />;
}
