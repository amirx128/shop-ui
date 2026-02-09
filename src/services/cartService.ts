import { DefaultSkuInfo } from '@/types/defaultSku';
import { ORDERS_API_URL } from '@/lib/orders';
import { resolveCustomerId } from '@/lib/customer';
import { buildOrdersCustomerHeaders } from '@/lib/ordersHeaders';
const trimUrl = (value?: string) => value?.replace(/\/+$/, '') ?? '';
const inventoryApiUrl = (() => {
  const url = trimUrl(process.env.NEXT_PUBLIC_INVENTORY_API_URL);
  if (!url) {
    throw new Error('NEXT_PUBLIC_INVENTORY_API_URL must be defined in the environment.');
  }

  return url;
})();

async function fetchJson<T>(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'خطای سرویس؛ دوباره تلاش نمایید.');
  }
  return (await response.json()) as T;
}

export interface ProductDefaultSkuResponse {
  productId: string;
  skuId?: string | null;
  availableQty: number;
}

export interface CartComplementaryProductResponse {
  productId: string;
  slug: string;
  name: string;
  priceRial: number;
  categoryName: string;
  imageUrl?: string | null;
  colorCodes: string[];
}

export async function findDefaultSku(
  productId: string
): Promise<ProductDefaultSkuResponse | null> {
  if (!productId) {
    return null;
  }

  const payload = { productIds: [productId] };
  const data = await fetchJson<ProductDefaultSkuResponse[]>(
    `${inventoryApiUrl}/api/inventory/default-skus`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  const match = data.find((item) => item.productId === productId);
  return match ?? null;
}

export type CartItemPayload = {
  productId: string;
  skuId?: string | null;
  quantity: number;
  unitOfMeasure: string;
  unitPrice: number;
  discountPerUnit: number;
  rowPrice: number;
  propertyValueIds?: string[];
};

export async function addProductToCart(payload: CartItemPayload): Promise<void> {
  const url = `${ORDERS_API_URL}/api/customer/carts/current/items`;
  await fetchJson(url, {
    method: 'POST',
    headers: buildOrdersCustomerHeaders(),
    body: JSON.stringify(payload),
  });
}

export async function checkoutCart(): Promise<void> {
  const url = `${ORDERS_API_URL}/api/shopping-carts/checkout`;
  await fetchJson(url, {
    method: 'POST',
    headers: buildOrdersCustomerHeaders(),
    body: JSON.stringify({ CustomerId: resolveCustomerId() }),
  });
}

export async function updateCartItemQuantity(
  productId: string,
  quantity: number,
  skuId?: string | null
): Promise<void> {
  const url = `${ORDERS_API_URL}/api/customer/carts/current/items/${encodeURIComponent(
    productId
  )}/quantity`;

  await fetchJson(url, {
    method: 'PUT',
    headers: buildOrdersCustomerHeaders(),
    body: JSON.stringify({ quantity, skuId }),
  });
}

const DEFAULT_SKU_NOT_AVAILABLE_ERROR = 'هیچ SKU با موجودی بیشتر از ۱ یافت نشد.';

async function resolveProductSku(
  productId: string,
  defaultSku?: DefaultSkuInfo | null
): Promise<DefaultSkuInfo | null> {
  if (defaultSku?.id) {
    return defaultSku;
  }

  const fallback = await findDefaultSku(productId);
  if (fallback?.skuId) {
    return {
      id: fallback.skuId,
      availableQty: fallback.availableQty,
    };
  }

  return null;
}

export interface AddProductToCartWithDefaultSkuPayload {
  productId: string;
  defaultSku?: DefaultSkuInfo | null;
  quantity?: number;
  unitOfMeasure?: string;
  unitPrice: number;
  discountPerUnit?: number;
  rowPrice?: number;
  propertyValueIds?: string[];
}

export async function addProductToCartWithDefaultSku(
  payload: AddProductToCartWithDefaultSkuPayload
): Promise<void> {
  const {
    productId,
    defaultSku,
    quantity = 1,
    unitOfMeasure = 'unit',
    unitPrice,
    discountPerUnit = 0,
    rowPrice,
    propertyValueIds,
  } = payload;

  const resolvedRowPrice = rowPrice ?? unitPrice * quantity;
  const resolvedSku = await resolveProductSku(productId, defaultSku);

  if (!resolvedSku || resolvedSku.availableQty < quantity) {
    throw new Error(DEFAULT_SKU_NOT_AVAILABLE_ERROR);
  }

  await addProductToCart({
    productId,
    skuId: resolvedSku.id,
    quantity,
    unitOfMeasure,
    unitPrice,
    discountPerUnit,
    rowPrice: resolvedRowPrice,
    propertyValueIds,
  });
}

export async function fetchCartComplementaryProducts(): Promise<CartComplementaryProductResponse[]> {
  const url = `${ORDERS_API_URL}/api/customer/carts/current/complementary-products`;
  return fetchJson<CartComplementaryProductResponse[]>(url, {
    method: 'GET',
    headers: buildOrdersCustomerHeaders({ includeContentType: false }),
    cache: 'no-store',
  });
}
