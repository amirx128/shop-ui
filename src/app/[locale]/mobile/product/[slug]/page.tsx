import ProductDetailContainer from '@/components/pages/productDetail/ProductDetailContainer';

const decodeSlug = (slug?: string) => {
  if (!slug) {
    return '';
  }

  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const normalizedSlug = decodeSlug(slug).replace(/^\/+/, '');

  return {
    title: normalizedSlug || undefined,
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
