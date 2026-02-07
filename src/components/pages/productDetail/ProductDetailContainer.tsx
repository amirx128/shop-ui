import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getBaseCatalogUrl } from '@/lib/catalog';
import ProductDetailView from './ProductDetailView';
import {
  CategoryPropertyFilterDto,
  CategoryPropertyFilterValueDto,
  CategorySummaryDto,
  ProductDetailsDto,
} from './types';

const formatPriceValue = (value?: number) => {
  if (typeof value !== 'number') {
    return '—';
  }
  return `${value.toLocaleString('fa-IR')} تومان`;
};

interface ProductDetailContainerProps {
  params: {
    locale: string;
    slug: string;
  };
  searchParams: {
    sourceSlug?: string;
  };
}

const fetchProductBySlug = (baseUrl: string, slugValue: string) =>
  fetch(`${baseUrl}/api/catalog/products/slug/${encodeURIComponent(slugValue)}`, {
    cache: 'no-store',
  });

export default async function ProductDetailContainer({
  params,
  searchParams,
}: ProductDetailContainerProps) {
  const { locale, slug } = params;
  const baseUrl = getBaseCatalogUrl();
  const getTranslation = await getTranslations({
    locale,
    namespace: 'product',
  });
  const translations: Record<string, string> = {
    addToCart: getTranslation('addToCart') ?? '',
    shareSuccess: getTranslation('shareSuccess') ?? '',
    shareError: getTranslation('shareError') ?? '',
    copySuccess: getTranslation('copySuccess') ?? '',
    copyError: getTranslation('copyError') ?? '',
    color: getTranslation('color') ?? '',
    black: getTranslation('black') ?? '',
    gray: getTranslation('gray') ?? '',
    pink: getTranslation('pink') ?? '',
    orange: getTranslation('orange') ?? '',
    ageGroup: getTranslation('ageGroup') ?? '',
    productDescription: getTranslation('productDescription') ?? '',
    usageGuideTitle: getTranslation('usageGuideTitle') ?? '',
    usageGuideEmpty: getTranslation('usageGuideEmpty') ?? '',
    descriptionTitle: getTranslation('descriptionTitle') ?? '',
    fullDescriptionTitle: getTranslation('fullDescriptionTitle') ?? '',
    productFeatures: getTranslation('productFeatures') ?? '',
    reviews: getTranslation('reviews') ?? '',
    rating: getTranslation('rating') ?? '',
    averageRating: getTranslation('averageRating') ?? '',
    reviewScores: getTranslation('reviewScores') ?? '',
    submitReview: getTranslation('submitReview') ?? '',
    cancel: getTranslation('cancel') ?? '',
    submit: getTranslation('submit') ?? '',
    pleaseRate: getTranslation('pleaseRate') ?? '',
    rateToHelp: getTranslation('rateToHelp') ?? '',
    writeComment: getTranslation('writeComment') ?? '',
    userName: getTranslation('userName') ?? '',
    commentText: getTranslation('commentText') ?? '',
    loadingComments: getTranslation('loadingComments') ?? '',
    noComments: getTranslation('noComments') ?? '',
    material: getTranslation('material') ?? '',
    colorFeature: getTranslation('colorFeature') ?? '',
    gender: getTranslation('gender') ?? '',
    quality: getTranslation('quality') ?? '',
  };

  const canonicalSlug = searchParams?.sourceSlug ?? slug;
  let productResponse = await fetchProductBySlug(baseUrl, canonicalSlug);
  if (!productResponse.ok && canonicalSlug !== slug) {
    productResponse = await fetchProductBySlug(baseUrl, slug);
  }

  const [filterResponse, categoryResponse] = await Promise.all([
    fetch(`${baseUrl}/api/catalog/products/category-filters?includeDescendants=true`, {
      cache: 'no-store',
    }),
    fetch(`${baseUrl}/api/catalog/products/category-filter`, { cache: 'no-store' }),
  ]);

  if (!productResponse.ok) {
    if (productResponse.status === 404) {
      notFound();
    }
    throw new Error('Unable to load product details.');
  }

  if (!filterResponse.ok || !categoryResponse.ok) {
    throw new Error('Unable to load catalog metadata.');
  }

  const product: ProductDetailsDto = await productResponse.json();
  const filterData = (await filterResponse.json()) as CategoryPropertyFilterDto[];
  const categoryData = (await categoryResponse.json()) as {
    categories: CategorySummaryDto[];
  };

  const categories = categoryData.categories ?? [];
  const categoryName =
    categories.find((category) => category.id === product.categoryId)?.name ?? '';

  const productColors = product.colors ?? [];
  const colorNames = Array.from(
    new Set(productColors.map((color) => color.name))
  );

  const candidateImages =
    product.images.length > 0
      ? product.images.map((image) => image.url)
      : [
          product.mainImageUrl,
          product.featuredImageUrl,
        ].filter((value): value is string => Boolean(value));
  const galleryImages =
    candidateImages.length > 0 ? candidateImages : ['/images/tempproduct.png'];

  const availableFilters = filterData ?? [];

  const filterValueLookup = new Map<string, CategoryPropertyFilterValueDto>(
    availableFilters.flatMap((filter) =>
      filter.values.map((value) => [value.id, value])
    )
  );

  const ageRangeOptions: CategoryPropertyFilterValueDto[] = product.ageRangeIds.map(
    (id) => {
      const matchedValue = filterValueLookup.get(id);
      return {
        id,
        title: matchedValue?.title ?? id,
        usageCount: matchedValue?.usageCount ?? 0,
      };
    }
  );

  const ageRangeNames = ageRangeOptions
    .map((value) => value.title)
    .filter((title) => Boolean(title));

  const patternProperty = product.properties.find((prop) =>
    /pattern|مدل|نوع/i.test(prop.title)
  );

  const propertyFeatures = product.properties
    .filter((prop) => prop.id !== patternProperty?.id)
    .map(
      (prop) =>
        `${prop.title}: ${prop.values.map((value) => value.title).join(', ')}`.trim()
    )
    .filter((feature) => feature.length > 0);

  const featureList = [
    product.brand ? `${translations.material ?? 'Brand'}: ${product.brand}` : null,
    colorNames.length
      ? `${translations.colorFeature ?? 'Colors'}: ${colorNames.join(', ')}`
      : null,
    ageRangeNames.length
      ? `${translations.ageGroup ?? 'ageRangeIds'}: ${ageRangeNames.join(', ')}`
      : null,
    ...propertyFeatures,
  ].filter((value): value is string => Boolean(value));

  const modalFeatures = [
    {
      title: translations.material ?? 'Brand',
      value: product.brand || '—',
    },
    {
      title: translations.gender ?? 'Gender',
      value: product.genderId || '—',
    },
    {
      title: translations.ageGroup ?? 'age Range',
      value: ageRangeNames.join(', ') || '—',
    },
    {
      title: translations.colorFeature ?? 'Colors',
      value: colorNames.join(', ') || '—',
    },
    {
      title: translations.quality ?? 'Condition',
      value: product.unitOfMeasure || '—',
    },
    {
      title: 'Price',
      value: formatPriceValue(product.priceRial),
    },
  ];

  return (
    <ProductDetailView
      translations={translations}
      categoryName={categoryName}
      galleryImages={galleryImages}
      featureList={featureList}
      modalFeatures={modalFeatures}
      product={product}
      ageRangeOptions={ageRangeOptions}
      locale={locale}
    />
  );
}
