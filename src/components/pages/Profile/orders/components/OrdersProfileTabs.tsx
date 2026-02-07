'use client';

import { Box, ButtonBase, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { OrdersProfileStatus, OrdersProfileTab } from '../types/ordersProfile';

interface OrdersProfileTabsProps {
  tabs: OrdersProfileTab[];
  activeTab: OrdersProfileStatus;
  onChange: (tab: OrdersProfileStatus) => void;
}

export default function OrdersProfileTabs({
  tabs,
  activeTab,
  onChange,
}: OrdersProfileTabsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        overflowX: 'auto',
        pb: 0.5,
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;

        return (
          <ButtonBase
            key={tab.key}
            onClick={() => onChange(tab.key)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.25,
              py: 0.75,
              borderRadius: 2,
              flexShrink: 0,
              color: isActive ? 'secondary.main' : 'text.primary',
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                color: 'inherit',
              }}
            >
              {tab.label}
            </Typography>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: (theme) =>
                  isActive
                    ? alpha(theme.palette.secondary.main, 0.1)
                    : theme.palette.grey[200],
                color: isActive ? 'secondary.main' : 'text.primary',
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 600, lineHeight: 1 }}>
                {tab.count}
              </Typography>
            </Box>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
