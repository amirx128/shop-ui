import { ORDERS_API_URL } from '@/lib/orders';
import { buildOrdersCustomerHeaders } from '@/lib/ordersHeaders';
import type { FavoriteProduct } from '@/types/favorites';

const getHeaders = () => buildOrdersCustomerHeaders();

const FALLBACK_PRODUCT_IMAGE = '/images/tempproduct.png';
const FALLBACK_COLOR = '#E5E7EB';

const normalizeProduct = (product: FavoriteProduct): FavoriteProduct => {
  const safeColors = Array.isArray(product.colors) ? product.colors : [];
  return {
    ...product,
    image: product.image ?? FALLBACK_PRODUCT_IMAGE,
    colors: safeColors.length > 0 ? safeColors : [FALLBACK_COLOR],
  };
};

const ensureSuccess = async (response: Response) => {
  if (response.ok) {
    return;
  }

  const text = await response.text().catch(() => '');
  throw new Error(text || 'Error connecting to the server.');
};

export interface FavoriteItem {
  productId: string;
  createdAtUtc: string;
}

export async function addFavorite(productId: string): Promise<void> {
  const url = `${ORDERS_API_URL}/api/customer/favorites`;
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ productId }),
  });
  await ensureSuccess(response);
}

export async function removeFavorite(productId: string): Promise<void> {
  const url = `${ORDERS_API_URL}/api/customer/favorites/${productId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  await ensureSuccess(response);
}

export async function getFavorites(): Promise<FavoriteItem[]> {
  const url = `${ORDERS_API_URL}/api/customer/favorites`;
  const response = await fetch(url, {
    headers: getHeaders(),
  });
  await ensureSuccess(response);
  return (await response.json()) as FavoriteItem[];
}

export async function getFavoriteProducts(): Promise<FavoriteProduct[]> {
  const url = `${ORDERS_API_URL}/api/customer/favorites/products`;
  const response = await fetch(url, {
    cache: 'no-store',
    headers: getHeaders(),
  });
  await ensureSuccess(response);
  const payload = (await response.json()) as FavoriteProduct[];
  return payload.map(normalizeProduct);
}
