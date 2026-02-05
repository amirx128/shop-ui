'use client';

import { useEffect, useState } from 'react';
import { Box, Container, CircularProgress, Typography } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ShopHeader from './ShopHeader';
import ShopBody from './ShopBody';
import ProductCard from '@/components/ui/ProductCard';
import FilterModal from './FilterModal';
import { toast } from 'react-toastify';
import { addProductToCart, checkoutCart } from '@/services/cartService';
import {
  ShopHeaderItemProps,
  CategoryPropertyFilter,
  SelectedFiltersPayload,
  CatalogProductSummaryDto,
  CategorySummary,
} from '../types';

interface ShopContainerClientProps {
  translations: {
    filter: string;
    mostDiscounted: string;
    mostViewed: string;
    newest: string;
    bestSelling: string;
    cheapest: string;
    mostExpensive: string;
    addToCart: string;
    viewProducts: string;
    clearFilters: string;
    from: string;
    to: string;
    currency: string;
    cheapestPrice: string;
    mostExpensivePrice: string;
  };
  locale: string;
}

const EMPTY_CATEGORY_ID = '00000000-0000-0000-0000-000000000000';

export default function ShopContainerClient({
  translations,
  locale,
}: ShopContainerClientProps) {
  const catalogApiBaseUrl = (
    process.env.NEXT_PUBLIC_CATALOG_API_URL ??
    process.env.NEXT_CATALOG_API_URL ??
    'http://localhost:5201'
  ).replace(/\/+$/, '');

  const trimSlugSuffix = (slug?: string, productId?: string) => {
    if (!slug) {
      return productId ?? '';
    }

    if (!productId) {
      return slug;
    }

    const normalizedIdPrefix = productId.replace(/-/g, '').slice(0, 8).toLowerCase();
    if (!normalizedIdPrefix) {
      return slug;
    }

    const candidateSuffix = `-${normalizedIdPrefix}`;
    if (slug.toLowerCase().endsWith(candidateSuffix)) {
      return slug.slice(0, slug.length - candidateSuffix.length);
    }

    return slug;
  };

  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [categoryFilters, setCategoryFilters] = useState<CategoryPropertyFilter[]>(
    []
  );
  const [filtersLoading, setFiltersLoading] = useState(true);
  const [filtersError, setFiltersError] = useState<string | null>(null);

  const [products, setProducts] = useState<CatalogProductSummaryDto[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [categoryLookup, setCategoryLookup] = useState<Record<string, string>>({});
  const [processingProductId, setProcessingProductId] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCategoryFilters() {
      setFiltersLoading(true);
      setFiltersError(null);

      if (!catalogApiBaseUrl) {
        setFiltersError('Catalog API URL is not configured.');
        setFiltersLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${catalogApiBaseUrl}/api/catalog/products/category-filters?includeDescendants=true`,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error('Unable to load category filters.');
        }

        const data: CategoryPropertyFilter[] = await response.json();
        setCategoryFilters(data ?? []);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setFiltersError(
          error instanceof Error ? error.message : 'Unable to load category filters.'
        );
        setCategoryFilters([]);
      } finally {
        if (!controller.signal.aborted) {
          setFiltersLoading(false);
        }
      }
    }

    loadCategoryFilters();

    return () => controller.abort();
  }, [catalogApiBaseUrl]);

  useEffect(() => {
    if (!catalogApiBaseUrl) {
      setCategoryLookup({});
      return;
    }

    const controller = new AbortController();

    async function loadCategories() {
      try {
        const response = await fetch(
          `${catalogApiBaseUrl}/api/catalog/products/category-filter`,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error('Unable to load categories.');
        }

        const data: { categories?: CategorySummary[] } = await response.json();
        const categories = data.categories ?? [];
        setCategoryLookup(
          Object.fromEntries(categories.map((category) => [category.id, category.name]))
        );
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setCategoryLookup({});
      }
    }

    loadCategories();

    return () => controller.abort();
  }, [catalogApiBaseUrl]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setProductsLoading(true);
      setProductsError(null);

      if (!catalogApiBaseUrl) {
        setProductsError('Catalog API URL is not configured.');
        setProductsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${catalogApiBaseUrl}/api/catalog/products`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error('Unable to load products.');
        }

        const data: CatalogProductSummaryDto[] = await response.json();
        setProducts(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setProductsError(
          error instanceof Error ? error.message : 'Unable to load products.'
        );
      } finally {
        if (!controller.signal.aborted) {
          setProductsLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, [catalogApiBaseUrl]);

  const handleAddToCart = async (product: CatalogProductSummaryDto) => {
    setProcessingProductId(product.id);

    try {
      const defaultSku = product.defaultSku;
      const skuId = defaultSku?.id;
      const availableQty = defaultSku?.availableQty ?? 0;
      if (!skuId || availableQty < 1) {
        throw new Error('هیچ SKU با موجودی بیشتر از 1 پیدا نشد.');
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
      toast.success('سفارش مشتری ثبت شد.');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'خطا در افزودن محصول به سبد خرید.'
      );
    } finally {
      setProcessingProductId(null);
    }
  };

  const applyFilters = async (filters: SelectedFiltersPayload) => {
    if (!catalogApiBaseUrl) {
      const message = 'Catalog API URL is not configured.';
      setProductsError(message);
      throw new Error(message);
    }

    setProductsLoading(true);
    setProductsError(null);

    const payload = {
      categoryId: EMPTY_CATEGORY_ID,
      includeDescendants: true,
      colorIds: filters.colorIds,
      ageRangeIds: filters.ageRangeIds,
      propertyFilters: filters.propertyFilters,
    };

    try {
      const response = await fetch(
        `${catalogApiBaseUrl}/api/catalog/products/filtered`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error('Unable to load filtered products.');
      }

      const data: CatalogProductSummaryDto[] = await response.json();
      setProducts(data);
    } catch (error) {
      setProductsError(
        error instanceof Error ? error.message : 'Unable to load filtered products.'
      );
      throw error;
    } finally {
      setProductsLoading(false);
    }
  };

  const items: ShopHeaderItemProps[] = [
    {
      icon: <FilterAltOutlinedIcon fontSize="small" />,
      label: translations.filter,
      isActive: activeIndex === 0,
      disableHover: true,
      onClick: () => {
        setActiveIndex(0);
        setFilterModalOpen(true);
      },
    },
    {
      label: translations.mostDiscounted,
      isActive: activeIndex === 1,
      onClick: () => setActiveIndex(1),
    },
    {
      label: translations.mostViewed,
      isActive: activeIndex === 2,
      onClick: () => setActiveIndex(2),
    },
    {
      label: translations.newest,
      isActive: activeIndex === 3,
      onClick: () => setActiveIndex(3),
    },
    {
      label: translations.bestSelling,
      isActive: activeIndex === 4,
      onClick: () => setActiveIndex(4),
    },
    {
      label: translations.cheapest,
      isActive: activeIndex === 5,
      onClick: () => setActiveIndex(5),
    },
    {
      label: translations.mostExpensive,
      isActive: activeIndex === 6,
      onClick: () => setActiveIndex(6),
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '100px',
      }}
    >
      <ShopHeader items={items} />
      <ShopBody>
        <Container>
          {productsLoading ? (
            <Box
              sx={{
                py: 6,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          ) : productsError ? (
            <Box sx={{ py: 6 }}>
              <Typography align="center" color="error">
                {productsError}
              </Typography>
            </Box>
          ) : products.length === 0 ? (
            <Box sx={{ py: 6 }}>
              <Typography align="center" color="text.secondary">
                No products found right now.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {products.map((product) => {
                const canonicalSlug = product.slug ?? product.id;
                const displaySlug = trimSlugSuffix(canonicalSlug, product.id);
                const query =
                  canonicalSlug !== displaySlug
                    ? `?sourceSlug=${encodeURIComponent(canonicalSlug)}`
                    : '';
                const detailUrl = `/${locale}/mobile/product/${encodeURIComponent(
                  displaySlug
                )}${query}`;

                return (
                  <ProductCard
                    key={product.id}
                    image={product.mainImageUrl ?? '/images/tempproduct.png'}
                    colors={[]}
                    category={categoryLookup[product.categoryId] ?? ''}
                    name={product.name}
                    price={Number(product.priceRial)}
                    addToCartText={translations.addToCart}
                    onAddToCart={() => handleAddToCart(product)}
                    isAddToCartLoading={processingProductId === product.id}
                    detailUrl={detailUrl}
                  />
                );
              })}
            </Box>
          )}
        </Container>
      </ShopBody>
      <FilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        locale={locale}
        translations={{
          filter: translations.filter,
          viewProducts: translations.viewProducts,
          clearFilters: translations.clearFilters,
          from: translations.from,
          to: translations.to,
          currency: translations.currency,
          cheapestPrice: translations.cheapestPrice,
          mostExpensivePrice: translations.mostExpensivePrice,
        }}
        categoryFilters={categoryFilters}
        loadingFilters={filtersLoading}
        filtersError={filtersError}
        onApplyFilters={applyFilters}
      />
    </Box>
  );
}
