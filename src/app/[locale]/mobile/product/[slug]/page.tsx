import ProductDetailContainer from '@/components/pages/productDetail/ProductDetailContainer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  return {
    title: slug,
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ sourceSlug?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  return (
    <ProductDetailContainer
      params={resolvedParams}
      searchParams={resolvedSearchParams}
    />
  );
}
