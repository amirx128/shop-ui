import { resolveCustomerId } from '@/lib/customer';

const ordersApiUrl =
  process.env.NEXT_PUBLIC_ORDERS_API_URL?.replace(/\/+$/, '') ?? 'http://localhost:5401';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'X-Customer-Id': resolveCustomerId(),
});

const ensureSuccess = async (response: Response) => {
  if (response.ok) {
    return;
  }

  const text = await response.text().catch(() => '');
  throw new Error(text || 'Error connecting to the server.');
};

export async function addFavorite(productId: string): Promise<void> {
  const url = `${ordersApiUrl}/api/customer/favorites`;
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ productId }),
  });
  await ensureSuccess(response);
}

export async function removeFavorite(productId: string): Promise<void> {
  const url = `${ordersApiUrl}/api/customer/favorites/${productId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  await ensureSuccess(response);
}
