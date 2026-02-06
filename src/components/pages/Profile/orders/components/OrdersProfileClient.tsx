'use client';

import { Box, Container } from '@mui/material';
import OrdersProfileHeader from './OrdersProfileHeader';
import OrdersProfileTabs from './OrdersProfileTabs';
import OrderCart from './OrderCart';
import { useOrdersProfileTabs } from '../hooks/useOrdersProfileTabs';
import type {
  OrdersProfileOrder,
  OrdersProfileStatus,
  OrdersProfileTab,
} from '../types/ordersProfile';
import { ROUTES } from '@/lib/routes';

interface OrdersProfileLabels {
  orderCode: string;
  payableAmount: string;
  currency: string;
  details: string;
}

interface OrdersProfileClientProps {
  title: string;
  backHref: string;
  tabs: OrdersProfileTab[];
  ordersByStatus: Record<OrdersProfileStatus, OrdersProfileOrder[]>;
  labels: OrdersProfileLabels;
}

export default function OrdersProfileClient({
  title,
  backHref,
  tabs,
  ordersByStatus,
  labels,
}: OrdersProfileClientProps) {
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
