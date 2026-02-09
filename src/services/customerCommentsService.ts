import { getBaseCatalogUrl } from '@/lib/catalog';
import { resolveCustomerId } from '@/lib/customer';

export interface ProductSummaryDto {
  id: string;
  name: string;
  slug: string;
  priceRial: number;
  mainImageUrl?: string | null;
}

export interface CustomerProductCommentDto {
  id: string;
  product: ProductSummaryDto;
  message: string;
  status: 'approved' | 'pending' | 'rejected';
  createdAtUtc: string;
  displayName: string;
  avatarUrl?: string | null;
}

const COMMENTS_ENDPOINT = `${getBaseCatalogUrl()}/api/catalog/product-comments/customer`;

export async function fetchCustomerComments(): Promise<CustomerProductCommentDto[]> {
  const headers = {
    'Content-Type': 'application/json',
    'X-Customer-Id': resolveCustomerId(),
  };

  const response = await fetch(COMMENTS_ENDPOINT, {
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Unable to load comments.');
  }

  return (await response.json()) as CustomerProductCommentDto[];
}
