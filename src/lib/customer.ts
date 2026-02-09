import { authStorage } from '@/lib/storage/authStorage';

const CUSTOMER_ID_REQUIRED_MESSAGE = 'نیاز به لاگین دارد';

export const resolveCustomerId = (): string => {
  const customerId = authStorage.getCustomerId();
  if (!customerId) {
    throw new Error(CUSTOMER_ID_REQUIRED_MESSAGE);
  }
  return customerId;
};
