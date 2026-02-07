import { resolveCustomerId } from '@/lib/customer';

const ordersApiUrl =
  process.env.NEXT_PUBLIC_ORDERS_API_URL?.replace(/\/+$/, '') ?? 'http://localhost:5401';
const inventoryApiUrl =
  process.env.NEXT_PUBLIC_INVENTORY_API_URL?.replace(/\/+$/, '') ?? 'http://localhost:5301';

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
  const url = `${ordersApiUrl}/api/customer/carts/current/items`;
  await fetchJson(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Customer-Id': resolveCustomerId(),
    },
    body: JSON.stringify(payload),
  });
}

export async function checkoutCart(): Promise<void> {
  const url = `${ordersApiUrl}/api/shopping-carts/checkout`;
  await fetchJson(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ CustomerId: resolveCustomerId() }),
  });
}
