import { getBaseCatalogUrl } from '@/lib/catalog';

export interface ProductCommentDto {
  id: string;
  productId: string;
  parentCommentId?: string | null;
  message: string;
  status: string;
  createdAtUtc: string;
  displayName: string;
  avatarUrl?: string | null;
  userId?: string | null;
  userType: string;
  authorFirstName?: string | null;
  moderatedAtUtc?: string | null;
  moderatedBy?: string | null;
  modifiedAtUtc?: string | null;
  modifiedBy?: string | null;
}

export async function fetchProductComments(
  productId: string
): Promise<ProductCommentDto[]> {
  const response = await fetch(
    `${getBaseCatalogUrl()}/api/catalog/products/${productId}/comments`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Unable to load product comments.');
  }

  const comments = (await response.json()) as ProductCommentDto[];
  return comments;
}
