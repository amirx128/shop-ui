'use client';

import { Box } from '@mui/material';
import { ShopHeaderProps } from '../types';
import ShopHeaderItem from './ShopHeaderItem';

export default function ShopHeader({ items }: ShopHeaderProps) {
  const filterItem = items[0];
  const scrollableItems = items.slice(1);

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 100,
        zIndex: 100,
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        padding: 1,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        {filterItem && (
          <ShopHeaderItem
            icon={filterItem.icon}
            label={filterItem.label}
            isActive={filterItem.isActive}
            onClick={filterItem.onClick}
          />
        )}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            overflowX: 'auto',
            flex: 1,
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {scrollableItems.map((item, index) => (
            <ShopHeaderItem
              key={index}
              icon={item.icon}
              label={item.label}
              isActive={item.isActive}
              onClick={item.onClick}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
