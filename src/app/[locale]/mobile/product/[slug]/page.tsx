import { getTranslations } from 'next-intl/server';
import ProductDetailContainer from '@/components/pages/productDetail/ProductDetailContainer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'product',
  });

  return {
    title: t('addToCart'),
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: { sourceSlug?: string };
}) {
  const resolvedParams = await params;
  return (
    <ProductDetailContainer
      params={resolvedParams}
      searchParams={searchParams}
    />
  );
}
