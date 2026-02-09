'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, Container } from '@mui/material';
import { useLocale } from 'next-intl';
import OrdersProfileHeader from './OrdersProfileHeader';
import OrdersProfileTabs from './OrdersProfileTabs';
import OrderCart from './OrderCart';
import { useOrdersProfileTabs } from '../hooks/useOrdersProfileTabs';
import type {
  OrdersProfileOrder,
  OrdersProfileStatus,
} from '../types/ordersProfile';
import { ROUTES } from '@/lib/routes';
import { ORDERS_API_URL } from '@/lib/orders';
import { buildOrdersCustomerHeaders } from '@/lib/ordersHeaders';

interface OrdersProfileLabels {
  orderCode: string;
  payableAmount: string;
  currency: string;
  details: string;
}

interface OrdersProfileClientProps {
  title: string;
  backHref: string;
  statusLabels: Record<OrdersProfileStatus, string>;
  itemAlt: string;
  labels: OrdersProfileLabels;
}

const ORDER_STATUSES: OrdersProfileStatus[] = [
  'processing',
  'delivered',
  'returned',
  'canceled',
];

interface ShoppingCartSummaryDto {
  cartId?: string;
  cartCode?: string | null;
  createdAtUtc?: string;
  itemsCount?: number;
  totalAmount?: number;
  deliverDateTime?: string | null;
  isPaid?: boolean;
  accountingDocumentId?: string | null;
  accountingDocumentNumber?: string | null;
  CartId?: string;
  CartCode?: string | null;
  CreatedAtUtc?: string;
  ItemsCount?: number;
  TotalAmount?: number;
  DeliverDateTime?: string | null;
  IsPaid?: boolean;
  AccountingDocumentId?: string | null;
  AccountingDocumentNumber?: string | null;
}

export default function OrdersProfileClient({
  title,
  backHref,
  statusLabels,
  itemAlt,
  labels,
}: OrdersProfileClientProps) {
  const locale = useLocale();
  const [orders, setOrders] = useState<OrdersProfileOrder[]>([]);

  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(locale),
    [locale],
  );
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    [locale],
  );

  useEffect(() => {
    const controller = new AbortController();

    const loadOrders = async () => {
      let headers: Record<string, string>;
      try {
        headers = buildOrdersCustomerHeaders({ includeContentType: false });
      } catch (error) {
        console.error('Unable to build order headers', error);
        return;
      }

      try {
        const response = await fetch(
          `${ORDERS_API_URL}/api/shopping-carts?includePaid=true`,
          {
            headers,
            cache: 'no-store',
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error('Failed to load orders');
        }

        const payload = (await response.json()) as ShoppingCartSummaryDto[];
        const filtered = payload.filter((cart) => {
          const isPaid = cart.isPaid ?? cart.IsPaid ?? false;
          const accountingDocumentId =
            cart.accountingDocumentId ?? cart.AccountingDocumentId;
          const accountingDocumentNumber =
            cart.accountingDocumentNumber ?? cart.AccountingDocumentNumber;
          return Boolean(
            isPaid && accountingDocumentId && accountingDocumentNumber,
          );
        });

        const normalized = filtered
          .map((cart) => {
            const createdAtValue =
              cart.createdAtUtc ?? cart.CreatedAtUtc ?? null;
            if (!createdAtValue) {
              return null;
            }
            const createdAt = new Date(createdAtValue);
            if (Number.isNaN(createdAt.getTime())) {
              return null;
            }

            const cartId = cart.cartId ?? cart.CartId;
            if (!cartId) {
              return null;
            }

            const amount = cart.totalAmount ?? cart.TotalAmount ?? 0;
            const itemsCount = Math.max(
              1,
              cart.itemsCount ?? cart.ItemsCount ?? 1,
            );

            const order: OrdersProfileOrder & { sortKey: number } = {
              id: cartId,
              code: cart.cartCode ?? cart.CartCode ?? cartId,
              date: dateFormatter.format(createdAt),
              status: 'delivered',
              statusLabel: statusLabels.delivered,
              amount: numberFormatter.format(amount),
              items: Array.from({ length: itemsCount }, (_, index) => ({
                id: `${cartId}-${index + 1}`,
                src: '/images/tempProduct.png',
                alt: `${itemAlt} ${index + 1}`,
              })),
              sortKey: createdAt.getTime(),
            };

            return order;
          })
          .filter(
            (
              order,
            ): order is OrdersProfileOrder & { sortKey: number } =>
              order !== null,
          )
          .sort((a, b) => b.sortKey - a.sortKey)
          .map(({ sortKey, ...rest }) => rest);

        if (!controller.signal.aborted) {
          setOrders(normalized);
        }
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        console.error('Failed to load orders', error);
      }
    };

    void loadOrders();

    return () => {
      controller.abort();
    };
  }, [itemAlt, locale, statusLabels]);

  const ordersByStatus = useMemo(() => {
    const grouped = {} as Record<OrdersProfileStatus, OrdersProfileOrder[]>;
    for (const status of ORDER_STATUSES) {
      grouped[status] = orders.filter((order) => order.status === status);
    }
    return grouped;
  }, [orders]);

  const tabs = useMemo(
    () =>
      ORDER_STATUSES.map((status) => ({
        key: status,
        label: statusLabels[status],
        count: ordersByStatus[status]?.length ?? 0,
      })),
    [ordersByStatus, statusLabels],
  );

  const { activeTab, setActiveTab } = useOrdersProfileTabs(
    tabs[0]?.key ?? 'processing',
  );

  const activeOrders = ordersByStatus[activeTab] ?? [];

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          py: 2,
          backgroundColor: 'background.default',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Container>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <OrdersProfileHeader title={title} backHref={backHref} />
            <OrdersProfileTabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </Box>
        </Container>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Container sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {activeOrders.map((order) => (
              <OrderCart
                key={order.id}
                order={order}
                labels={labels}
                detailsHref={`${ROUTES.profile.ORDER_DETAIL}/${order.id}`}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
