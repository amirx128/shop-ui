'use client';

import { useCallback, useMemo, useState } from 'react';
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
import { addProductToCart, checkoutCart, findDefaultSku } from '@/services/cartService';
import { addFavorite, removeFavorite } from '@/services/favoritesService';
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

  const [relationProductLoadingId, setRelationProductLoadingId] = useState<string | null>(null);

  const handleRelationProductAddToCart = useCallback(
    async (product: ProductRelationSummary) => {
      setRelationProductLoadingId(product.id);
      try {
        let resolvedSku = product.defaultSku ?? null;
        if (!resolvedSku?.id) {
          const fallback = await findDefaultSku(product.id);
          if (fallback?.skuId) {
            resolvedSku = {
              id: fallback.skuId,
              availableQty: fallback.availableQty,
            };
          }
        }

        const skuId = resolvedSku?.id;
        const availableQty = resolvedSku?.availableQty ?? 0;
        if (!skuId || availableQty < 1) {
          throw new Error('Ù‡ÛŒÚ† SKU Ø¨Ø§ Ù…ÙˆØ¬ÙˆØ¯ÛŒ Ø¨ÛŒØ´ØªØ± Ø§Ø² 1 Ù¾ÛŒØ¯Ø§ Ù†Ø´Ø¯.');
        }

        await addProductToCart({
          productId: product.id,
          skuId,
          quantity: 1,
          unitOfMeasure: product.unitOfMeasure ?? 'unit',
          unitPrice: product.priceRial,
          discountPerUnit: 0,
          rowPrice: product.priceRial,
        });

        await checkoutCart();
        toast.success('Ø³ÙØ§Ø±Ø´ Ù…Ø´ØªØ±ÛŒ Ø«Ø¨Øª Ø´Ø¯.');
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Ø®Ø·Ø§ Ø¯Ø± Ø§ÙØ²ÙˆØ¯Ù† Ù…Ø­ØµÙˆÙ„ Ø¨Ù‡ Ø³Ø¨Ø¯ Ø®Ø±ÛŒØ¯.'
        );
      } finally {
        setRelationProductLoadingId((current) =>
          current === product.id ? null : current
        );
      }
    },
    []
  );

  const handleFavoriteToggle = useCallback<ProductCardFavoriteToggle>(
    async (productId, shouldAdd) => {
      try {
        if (shouldAdd) {
          await addFavorite(productId);
        } else {
          await removeFavorite(productId);
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
        />
        <SuggestionProductSection
          addToCartText={translate('addToCart')}
          products={product.complementaryProducts}
          locale={locale}
          onAddToCart={handleRelationProductAddToCart}
          processingProductId={relationProductLoadingId}
          onFavoriteToggle={handleFavoriteToggle}
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
