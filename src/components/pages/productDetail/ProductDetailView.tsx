'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
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
  CategoryPropertyFilterValueDto,
  ProductDetailsDto,
  ProductRelationSummary,
  ProductVariableSelection,
} from './types';
import { addProductToCartWithDefaultSku, checkoutCart } from '@/services/cartService';
import { addFavorite, getFavorites, removeFavorite } from '@/services/favoritesService';
import type { ProductCardFavoriteToggle } from '@/components/ui/ProductCard';

interface ProductDetailViewProps {
  translations: Record<string, string>;
  categoryName: string;
  galleryImages: string[];
  featureList: string[];
  modalFeatures: {
    title: string;
    value: string;
  }[];
  product: ProductDetailsDto;
  ageRangeOptions: CategoryPropertyFilterValueDto[];
  locale: string;
}

export default function ProductDetailView({
  translations,
  categoryName,
  galleryImages,
  featureList,
  modalFeatures,
  product,
  ageRangeOptions,
  locale,
}: ProductDetailViewProps) {
  const buildInitialSelection = (): ProductVariableSelection => {
    const propertyValues = product.properties
      .filter((property) => property.values.length > 0)
      .map((property) => property.values[0].id);

    return {
      colorId: product.colors[0]?.id,
      ageRangeId: ageRangeOptions[0]?.id,
      propertyValueIds: propertyValues,
    };
  };

  const [selection, setSelection] = useState<ProductVariableSelection>(() =>
    buildInitialSelection()
  );
  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>([]);

  const [relationProductLoadingId, setRelationProductLoadingId] = useState<string | null>(null);

  const handleRelationProductAddToCart = useCallback(
    async (product: ProductRelationSummary) => {
      setRelationProductLoadingId(product.id);
      try {
        await addProductToCartWithDefaultSku({
          productId: product.id,
          defaultSku: product.defaultSku,
          quantity: 1,
          unitOfMeasure: product.unitOfMeasure ?? 'unit',
          unitPrice: product.priceRial,
          discountPerUnit: 0,
          rowPrice: product.priceRial,
        });

        await checkoutCart();
        toast.success('سفارش مشتری ثبت شد.');
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'خطا در افزودن محصول به سبد خرید.'
        );
      } finally {
        setRelationProductLoadingId((current) =>
          current === product.id ? null : current
        );
      }
    },
    []
  );

  useEffect(() => {
    let isActive = true;

    getFavorites()
      .then((items) => {
        if (!isActive) {
          return;
        }
        setFavoriteProductIds(items.map((item) => item.productId));
      })
      .catch(() => {
        // ignore; keep existing favorites list.
      });

    return () => {
      isActive = false;
    };
  }, []);

  const handleFavoriteToggle = useCallback<ProductCardFavoriteToggle>(
    async (productId, shouldAdd) => {
      try {
        if (shouldAdd) {
          await addFavorite(productId);
          setFavoriteProductIds((ids) =>
            ids.includes(productId) ? ids : [...ids, productId]
          );
        } else {
          await removeFavorite(productId);
          setFavoriteProductIds((ids) =>
            ids.filter((id) => id !== productId)
          );
        }
        return true;
      } catch (error) {
        toast.error('Failed to update favorites.');
        return false;
      }
    },
    []
  );

  const translate = (key: string) => translations[key] ?? '';

  const handleSelectionChange = useCallback(
    (next: ProductVariableSelection) => {
      setSelection(next);
    },
    []
  );

  const propertyValueIds = useMemo(() => {
    const ids = new Set<string>(selection.propertyValueIds ?? []);
    if (product.colors.length > 0 && selection.colorId) {
      ids.add(selection.colorId);
    }
    if (ageRangeOptions.length > 0 && selection.ageRangeId) {
      ids.add(selection.ageRangeId);
    }
    return Array.from(ids);
  }, [
    selection,
    product.colors.length,
    ageRangeOptions.length,
  ]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <ProductDetailHeader headerText={product.slug ?? product.name} />

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
          productId={product.id}
          productName={product.name}
          onFavoriteToggle={handleFavoriteToggle}
          isFavorite={favoriteProductIds.includes(product.id)}
          toastTranslations={{
            shareSuccess: translate('shareSuccess'),
            shareError: translate('shareError'),
            copySuccess: translate('copySuccess'),
            copyError: translate('copyError'),
          }}
        />

        <ProductVariableSection
          translations={{
            color: translate('color'),
            black: translate('black'),
            gray: translate('gray'),
            pink: translate('pink'),
            orange: translate('orange'),
            ageGroup: translate('ageGroup'),
          }}
          colors={product.colors}
          properties={product.properties}
          ageRanges={ageRangeOptions}
          onSelectionChange={handleSelectionChange}
        />

        <ProductDescriptionSection
          translations={{
            productDescription: translate('productDescription'),
            descriptionTitle: translate('descriptionTitle'),
            descriptionText: product.description,
            fullDescriptionTitle: translate('fullDescriptionTitle'),
            fullDescriptionText: product.description,
          }}
          description={product.description}
          fullDescription={product.description}
          locale={locale}
        />

        <ProductFeatureSection
          translations={{
            productFeatures: translate('productFeatures'),
          }}
          features={featureList}
          modalFeatures={modalFeatures}
        />

        <ProductCommentSection
          translations={{
            reviews: translate('reviews'),
            rating: translate('rating'),
            averageRating: translate('averageRating'),
            reviewScores: translate('reviewScores'),
            submitReview: translate('submitReview'),
            cancel: translate('cancel'),
            submit: translate('submit'),
            pleaseRate: translate('pleaseRate'),
            rateToHelp: translate('rateToHelp'),
            writeComment: translate('writeComment'),
            userName: translate('userName'),
            commentText: translate('commentText'),
            loadingComments: translate('loadingComments'),
            noComments: translate('noComments'),
          }}
          productId={product.id}
        />
        <ProductGudeSection
          translations={{
            title: translate('usageGuideTitle'),
            emptyMessage: translate('usageGuideEmpty'),
          }}
          usageGuide={product.usageGuide}
        />
        <SimilarProductSection
          addToCartText={translate('addToCart')}
          products={product.similarProducts}
          locale={locale}
          onAddToCart={handleRelationProductAddToCart}
          processingProductId={relationProductLoadingId}
          onFavoriteToggle={handleFavoriteToggle}
          favoriteProductIds={favoriteProductIds}
        />
        <SuggestionProductSection
          addToCartText={translate('addToCart')}
          products={product.complementaryProducts}
          locale={locale}
          onAddToCart={handleRelationProductAddToCart}
          processingProductId={relationProductLoadingId}
          onFavoriteToggle={handleFavoriteToggle}
          favoriteProductIds={favoriteProductIds}
        />
      </Box>

      <ProductDetailFooter
        price={product.priceRial}
        addToCartText={translate('addToCart')}
        productId={product.id}
        unitOfMeasure={product.unitOfMeasure}
        propertyValueIds={propertyValueIds}
      />
    </Box>
  );
}
