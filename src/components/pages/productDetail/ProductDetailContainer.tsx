import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Box } from '@mui/material';
import ProductDetailHeader from './components/ProductDetailHeader';
import ProductDetailFooter from './components/ProductDetailFooter';
import ProductGallery from './components/ProductGallery';
import ProductTitleSection from './components/ProductTitleSection';
import ProductVariableSection from './components/ProductVariableSection';
import ProductDescriptionSection from './components/ProductDescriptionSection';
import ProductFeatureSection from './components/ProductFeatureSection';
import ProductCommentSection from './components/ProductCommentSection';
import ProductGudeSection from './components/ProductGudeSection';
import SimilarProductSection from './components/SimilarProductSection';
import SuggestionProductSection from './components/SuggestionProductSection';
import {
  CategoryFilterResponse,
  CategorySummaryDto,
  ProductDetailsDto,
} from './types';
import { COLOR_FILTER_ID, AGE_RANGE_FILTER_ID } from '@/components/pages/shop/types';

const DEFAULT_CATALOG_API_URL = 'http://localhost:5201';

const getBaseCatalogUrl = () => {
  const catalogUrl =
    process.env.NEXT_CATALOG_API_URL ??
    process.env.NEXT_PUBLIC_CATALOG_API_URL ??
    DEFAULT_CATALOG_API_URL;

  if (!catalogUrl) {
    return DEFAULT_CATALOG_API_URL;
  }

  return catalogUrl.replace(/\/+$/, '');
};

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
  const translations = (await getTranslations({
    locale,
    namespace: 'product',
  })) as Record<string, string>;

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
  const filterData = (await filterResponse.json()) as CategoryFilterResponse;
  const categoryData = (await categoryResponse.json()) as {
    categories: CategorySummaryDto[];
  };

  const categories = categoryData.categories ?? [];
  const categoryName =
    categories.find((category) => category.id === product.categoryId)?.name ?? '';

  const candidateImages =
    product.images.length > 0
      ? product.images.map((image) => image.url)
      : [
          product.mainImageUrl,
          product.featuredImageUrl,
        ].filter((value): value is string => Boolean(value));
  const galleryImages =
    candidateImages.length > 0 ? candidateImages : ['/images/tempproduct.png'];

  const availableFilters = filterData?.filters ?? [];
  const colorFilter = availableFilters.find(
    (filter) => filter.id === COLOR_FILTER_ID
  );
  const ageRangeFilter = availableFilters.find(
    (filter) => filter.id === AGE_RANGE_FILTER_ID
  );

  const colorNames =
    colorFilter?.values
      .filter((value) => product.colorIds.includes(value.id))
      .map((value) => value.title) ?? [];

  const ageRangeNames =
    ageRangeFilter?.values
      .filter((value) => product.ageRangeIds.includes(value.id))
      .map((value) => value.title) ?? [];

  const patternProperty = product.properties.find((prop) =>
    /pattern|مدل|نوع/i.test(prop.title)
  );
  const patternOptions = patternProperty?.values.map((value) => value.title) ?? [];

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
      ? `${translations.ageGroup ?? 'Age Range'}: ${ageRangeNames.join(', ')}`
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
      title: translations.ageGroup ?? 'Age Group',
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <ProductDetailHeader productName={product.name} />

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: '80px',
        }}
      >
        <ProductGallery images={galleryImages} />

        <ProductTitleSection
          category={categoryName}
          productName={product.name}
          toastTranslations={{
            shareSuccess: translations.shareSuccess,
            shareError: translations.shareError,
            copySuccess: translations.copySuccess,
            copyError: translations.copyError,
          }}
        />

        <ProductVariableSection
          translations={{
            color: translations.color,
            pattern: translations.pattern,
            black: translations.black,
            gray: translations.gray,
            pink: translations.pink,
            orange: translations.orange,
            catPattern: translations.catPattern,
            carPattern: translations.carPattern,
          }}
          colors={colorNames}
          patterns={patternOptions}
        />

        <ProductDescriptionSection
          translations={{
            productDescription: translations.productDescription,
            descriptionTitle: translations.descriptionTitle,
            descriptionText: product.description,
            fullDescriptionTitle: translations.fullDescriptionTitle,
            fullDescriptionText: product.description,
          }}
        />

        <ProductFeatureSection
          translations={{
            productFeatures: translations.productFeatures,
          }}
          features={featureList}
          modalFeatures={modalFeatures}
        />

        <ProductCommentSection
          translations={{
            reviews: translations.reviews,
            rating: translations.rating,
            averageRating: translations.averageRating,
            reviewScores: translations.reviewScores,
            submitReview: translations.submitReview,
            cancel: translations.cancel,
            submit: translations.submit,
            pleaseRate: translations.pleaseRate,
            rateToHelp: translations.rateToHelp,
            writeComment: translations.writeComment,
            userName: translations.userName,
            commentText: translations.commentText,
          }}
        />
        <ProductGudeSection />
        <SimilarProductSection addToCartText={translations.addToCart} />
        <SuggestionProductSection addToCartText={translations.addToCart} />
      </Box>

      <ProductDetailFooter
        price={product.priceRial}
        addToCartText={translations.addToCart}
        productId={product.id}
        unitOfMeasure={product.unitOfMeasure}
        defaultSku={product.defaultSku}
      />
    </Box>
  );
}
