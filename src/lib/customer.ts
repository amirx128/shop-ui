import { authStorage } from '@/lib/storage/authStorage';

const FALLBACK_CUSTOMER_ID = 'd1a291d5-0cfa-4f5e-a019-44455492e985';

export const resolveCustomerId = (): string =>
  authStorage.getCustomerId() ?? FALLBACK_CUSTOMER_ID;
