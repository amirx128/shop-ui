'use client';

import { useState } from 'react';
import { Box, Container } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ShopHeader from './ShopHeader';
import ShopBody from './ShopBody';
import ProductCard from '@/components/ui/ProductCard';
import FilterModal from './FilterModal';
import { ShopHeaderItemProps } from '../types';

interface ShopContainerClientProps {
  translations: {
    filter: string;
    mostDiscounted: string;
    mostViewed: string;
    newest: string;
    bestSelling: string;
    cheapest: string;
    mostExpensive: string;
    addToCart: string;
    viewProducts: string;
    clearFilters: string;
    from: string;
    to: string;
    currency: string;
    cheapestPrice: string;
    mostExpensivePrice: string;
  };
  locale: string;
}

export default function ShopContainerClient({
  translations,
  locale,
}: ShopContainerClientProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const products = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    image: '/images/tempproduct.png',
    colors: ['#52525B', '#898BFA', '#FF4C8B', '#E16203', '#27272A'],
    category: 'تخت و گهواره',
    name: 'تخت نوزاد چوبی مدل رویا',
    price: 1256000,
  }));

  const items: ShopHeaderItemProps[] = [
    {
      icon: <FilterAltOutlinedIcon fontSize="small" />,
      label: translations.filter,
      isActive: activeIndex === 0,
      disableHover: true,
      onClick: () => {
        setActiveIndex(0);
        setFilterModalOpen(true);
      },
    },
    {
      label: translations.mostDiscounted,
      isActive: activeIndex === 1,
      onClick: () => setActiveIndex(1),
    },
    {
      label: translations.mostViewed,
      isActive: activeIndex === 2,
      onClick: () => setActiveIndex(2),
    },
    {
      label: translations.newest,
      isActive: activeIndex === 3,
      onClick: () => setActiveIndex(3),
    },
    {
      label: translations.bestSelling,
      isActive: activeIndex === 4,
      onClick: () => setActiveIndex(4),
    },
    {
      label: translations.cheapest,
      isActive: activeIndex === 5,
      onClick: () => setActiveIndex(5),
    },
    {
      label: translations.mostExpensive,
      isActive: activeIndex === 6,
      onClick: () => setActiveIndex(6),
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',

        paddingBottom: '100px',
      }}
    >
      <ShopHeader items={items} />
      <ShopBody>
        <Container>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                colors={product.colors}
                category={product.category}
                name={product.name}
                price={product.price}
                addToCartText={translations.addToCart}
              />
            ))}
          </Box>
        </Container>
      </ShopBody>
      <FilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        locale={locale}
        translations={{
          filter: translations.filter,
          viewProducts: translations.viewProducts,
          clearFilters: translations.clearFilters,
          from: translations.from,
          to: translations.to,
          currency: translations.currency,
          cheapestPrice: translations.cheapestPrice,
          mostExpensivePrice: translations.mostExpensivePrice,
        }}
      />
    </Box>
  );
}
