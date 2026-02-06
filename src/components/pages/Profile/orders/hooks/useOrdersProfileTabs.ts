'use client';

import { useState } from 'react';
import type { OrdersProfileStatus } from '../types/ordersProfile';

export function useOrdersProfileTabs(initialTab: OrdersProfileStatus) {
  const [activeTab, setActiveTab] = useState<OrdersProfileStatus>(initialTab);

  return {
    activeTab,
    setActiveTab,
  };
}
