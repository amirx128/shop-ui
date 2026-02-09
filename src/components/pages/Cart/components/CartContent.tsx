'use client';

import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import CartBody from './CartBody';
import CartBodyClient from './CartBodyClient';
import CartFooter from './CartFooter';
import type { CartProduct } from '../types/cart';
import { ORDERS_API_URL } from '@/lib/orders';
import { buildOrdersCustomerHeaders } from '@/lib/ordersHeaders';
import { getBaseCatalogUrl } from '@/lib/catalog';
import type { CatalogProductSummaryDto } from '@/components/pages/shop/types';

type OrderCartItemSku = {
  skuId: string;
  quantity: number;
};

type OrderCartItem = {
  productId: string;
  skuId?: string | null;
  quantity: number;
  unitOfMeasure: string;
  unitPrice: number;
  discountPerUnit: number;
  rowPrice: number;
  skus?: OrderCartItemSku[];
};

interface OrderCartResponse {
  items?: OrderCartItem[];
}

const FALLBACK_PRODUCT_IMAGE = '/images/tempproduct.png';
const catalogApiBaseUrl = getBaseCatalogUrl();

const fetchCatalogProducts = async (): Promise<CatalogProductSummaryDto[]> => {
  const response = await fetch(`${catalogApiBaseUrl}/api/catalog/products`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Unable to load catalog data.');
  }

  return (await response.json()) as CatalogProductSummaryDto[];
};

const toNumber = (value?: number | null) => (typeof value === 'number' ? value : 0);

const buildProductName = (productId: string) => {
  if (!productId) {
    return 'کالا';
  }

  const normalized = productId.replace(/-/g, '');
  const trimmed = normalized.substring(0, 6);
  return trimmed ? `کالا ${trimmed}` : 'کالا';
};

const buildVariants = (item: OrderCartItem, locale: string) => {
  const variants = [];

  if (item.unitOfMeasure?.trim()) {
    variants.push({ label: 'واحد', value: item.unitOfMeasure });
  }

  if (item.skuId) {
    variants.push({ label: 'SKU', value: item.skuId.slice(0, 8) });
  }

  const discount = toNumber(item.discountPerUnit);
  if (discount > 0) {
    variants.push({
      label: 'تخفیف',
      value: `${discount.toLocaleString(locale)}`,
    });
  }

  if (item.skus && item.skus.length > 0) {
    const allocation = item.skus
      .map((sku) => `${sku.skuId.slice(0, 6)}×${sku.quantity}`)
      .join(', ');
    variants.push({ label: 'SKU های تخصیص‌یافته', value: allocation });
  }

  return variants;
};

const mapCartItems = (
  items: OrderCartItem[],
  locale: string,
  catalogLookup: Map<string, CatalogProductSummaryDto>
): CartProduct[] =>
  items.map((item) => {
    const safeQuantity = Math.max(item.quantity, 1);
    const rawUnitPrice = toNumber(item.unitPrice);
    const fallbackUnitPrice = toNumber(item.rowPrice) / safeQuantity;
    const catalogProduct = catalogLookup.get(item.productId);
    const catalogPrice = catalogProduct?.priceRial ?? 0;
    const price =
      rawUnitPrice > 0
        ? rawUnitPrice
        : fallbackUnitPrice > 0
        ? fallbackUnitPrice
        : catalogPrice;

    return {
      id: item.productId,
      image: catalogProduct?.mainImageUrl ?? FALLBACK_PRODUCT_IMAGE,
      quantity: item.quantity,
      skuId: item.skuId?.toString(),
      category:
        catalogProduct?.unitOfMeasure ??
        item.unitOfMeasure ??
        'سبد خرید',
      name: catalogProduct?.name ?? buildProductName(item.productId),
      price,
      variants: buildVariants(item, locale),
    };
  });

const fetchCart = async (): Promise<OrderCartResponse> => {
  const response = await fetch(`${ORDERS_API_URL}/api/customer/carts/current`, {
    cache: 'no-store',
    headers: buildOrdersCustomerHeaders({ includeContentType: false }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Unable to load cart.');
  }

  return (await response.json()) as OrderCartResponse;
};

interface CartContentProps {
  locale: string;
  currency: string;
  addToCartText: string;
  productsNeedTitle: string;
  summaryLabels: {
    itemsPrice: string;
    cartTotal: string;
    savings: string;
  };
  stepperLabels: {
    increase: string;
    decrease: string;
    remove: string;
  };
  totalLabel: string;
  actionLabel: string;
}

export default function CartContent({
  locale,
  currency,
  addToCartText,
  productsNeedTitle,
  summaryLabels,
  stepperLabels,
  totalLabel,
  actionLabel,
}: CartContentProps) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [savingsValue, setSavingsValue] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadCart = async () => {
      setLoading(true);
      setError(null);
      try {
        const [cartResponse, catalogProducts] = await Promise.all([
          fetchCart(),
          fetchCatalogProducts(),
        ]);

        if (!isActive) {
          return;
        }

        const cartItems = cartResponse.items ?? [];
        const catalogLookup = new Map<string, CatalogProductSummaryDto>(
          catalogProducts.map((product) => [product.id, product])
        );

        const mappedProducts = mapCartItems(cartItems, locale, catalogLookup);
        if (!isActive) {
          return;
        }

        setProducts(mappedProducts);
        setSavingsValue(
          cartItems.reduce(
            (acc, item) => acc + toNumber(item.discountPerUnit) * item.quantity,
            0
          )
        );

        setTotalPrice(
          mappedProducts.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
          )
        );
      } catch (err) {
        if (!isActive) {
          return;
        }
        setError(err instanceof Error ? err.message : 'Unable to load cart.');
        setProducts([]);
        setSavingsValue(0);
        setTotalPrice(0);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadCart();

    return () => {
      isActive = false;
    };
  }, [locale]);

  const formattedTotal = `${totalPrice.toLocaleString(locale)} ${currency}`;

  return (
    <>
      <CartBody>
        {loading ? (
          <Box
            sx={{
              py: 8,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ py: 8 }}>
            <Typography align="center" color="error">
              {error}
            </Typography>
          </Box>
        ) : (
          <CartBodyClient
            initialProducts={products}
            locale={locale}
            currency={currency}
            stepperLabels={stepperLabels}
            productsNeedTitle={productsNeedTitle}
            addToCartText={addToCartText}
            summaryLabels={summaryLabels}
            savingsValue={savingsValue}
          />
        )}
      </CartBody>
        <CartFooter
          totalLabel={totalLabel}
          totalValue={formattedTotal}
          actionLabel={actionLabel}
          locale={locale}
        />
    </>
  );
}
