import { ORDERS_API_URL } from '@/lib/orders';
import { buildOrdersCustomerHeaders } from '@/lib/ordersHeaders';

const fetchJson = async <T>(input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Unable to communicate with the orders service.');
  }

  return (await response.json()) as T;
};

export interface CartItemDto {
  ProductId: string;
  SkuId?: string | null;
  Quantity: number;
  UnitOfMeasure: string;
  UnitPrice: number;
  DiscountPerUnit: number;
  RowPrice: number;
}

export interface CartAddressDto {
  AddressId?: string | null;
  ProvinceId: number;
  CityId: number;
  Street: string;
  Address: string;
  Alley: string;
  Plaque: string;
  Unit: string;
  Location?: string | null;
  Title: string;
}

export interface CartDto {
  CartId: string;
  CustomerId: string;
  CartType: string;
  CartCode?: string | null;
  Items?: CartItemDto[] | null;
  CustomerAddress?: CartAddressDto | null;
  ShippingAmount?: number | null;
  DeliverDateTime?: string | null;
}

export interface ShippingCalculationDto {
  ShippingCost: number;
}

export interface CheckoutConfiguration {
  MinDeliverDay: number;
  ServerUtcNow: string;
}

export async function fetchCurrentCart(): Promise<CartDto> {
  const url = `${ORDERS_API_URL}/api/customer/carts/current`;
  return fetchJson<CartDto>(url, {
    method: 'GET',
    cache: 'no-store',
    headers: buildOrdersCustomerHeaders({ includeContentType: false }),
  });
}

export async function estimateCartShipping(
  cartId: string,
  addressId?: string | null,
): Promise<ShippingCalculationDto> {
  const params = new URLSearchParams();
  if (addressId) {
    params.set('addressId', addressId);
  }

  const url = `${ORDERS_API_URL}/api/shopping-carts/carts/${cartId}/shipping/estimate${
    params.toString() ? `?${params}` : ''
  }`;

  return fetchJson<ShippingCalculationDto>(url, {
    method: 'GET',
    cache: 'no-store',
    headers: buildOrdersCustomerHeaders({ includeContentType: false }),
  });
}

export async function updateCartShipping(
  cartId: string,
  payLater: boolean,
): Promise<CartDto> {
  const url = `${ORDERS_API_URL}/api/shopping-carts/carts/${cartId}/shipping`;
  return fetchJson<CartDto>(url, {
    method: 'PUT',
    headers: buildOrdersCustomerHeaders(),
    body: JSON.stringify({ PayLater: payLater }),
  });
}

export async function updateCartShippingAmount(
  cartId: string,
  shippingAmount: number,
): Promise<CartDto> {
  const url = `${ORDERS_API_URL}/api/shopping-carts/carts/${cartId}/shipping/amount`;
  return fetchJson<CartDto>(url, {
    method: 'PUT',
    headers: buildOrdersCustomerHeaders(),
    body: JSON.stringify({ ShippingAmount: shippingAmount }),
  });
}

export async function fetchCheckoutConfiguration(): Promise<CheckoutConfiguration> {
  const url = `${ORDERS_API_URL}/api/shopping-carts/checkout/config`;
  return fetchJson<CheckoutConfiguration>(url, {
    method: 'GET',
    cache: 'no-store',
    headers: buildOrdersCustomerHeaders({ includeContentType: false }),
  });
}

export async function setDeliverDateTime(
  cartId: string,
  deliverDateTime: string,
): Promise<void> {
  const url = `${ORDERS_API_URL}/api/shopping-carts/carts/${cartId}/deliver-date`;
  await fetchJson<boolean>(url, {
    method: 'PUT',
    headers: buildOrdersCustomerHeaders(),
    body: JSON.stringify({ DeliverDateTime: deliverDateTime }),
  });
}
