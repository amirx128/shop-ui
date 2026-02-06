export type OrdersProfileStatus = 'processing' | 'delivered' | 'returned' | 'canceled';

export interface OrdersProfileTab {
  key: OrdersProfileStatus;
  label: string;
  count: number;
}

export interface OrdersProfileOrderItem {
  id: string;
  src: string;
  alt: string;
}

export interface OrdersProfileOrder {
  id: string;
  date: string;
  code: string;
  status: OrdersProfileStatus;
  statusLabel: string;
  amount: string;
  items: OrdersProfileOrderItem[];
}
