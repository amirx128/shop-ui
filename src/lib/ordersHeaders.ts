import { authStorage } from '@/lib/storage/authStorage';
import { resolveCustomerId } from '@/lib/customer';

interface OrdersHeadersOptions {
  includeContentType?: boolean;
}

export const buildOrdersCustomerHeaders = ({
  includeContentType = true,
}: OrdersHeadersOptions = {}): Record<string, string> => {
  const headers: Record<string, string> = {
    'X-Customer-Id': resolveCustomerId(),
  };

  const accessToken = authStorage.getAccessToken();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  if (includeContentType) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
};
