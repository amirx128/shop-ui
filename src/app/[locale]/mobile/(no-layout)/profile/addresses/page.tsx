import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AdressesContainer from '@/components/pages/Profile/addresses/AdressesContainer';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('profile');
  const title = t('items.addresses');

  return {
    title,
    description: title,
  };
}

export default function AddressesPage() {
  return <AdressesContainer />;
}
