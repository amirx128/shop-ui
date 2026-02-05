'use client';

import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProductCard from '@/components/ui/ProductCard';
import Title from '@/components/ui/Title';

interface ProductsNeedSectionProps {
  title: string;
  addToCartText: string;
}

export default function ProductsNeedSection({
  title,
  addToCartText,
}: ProductsNeedSectionProps) {
  const products = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    image: '/images/tempproduct.png',
    colors: ['#52525B', '#898BFA', '#FF4C8B', '#E16203', '#27272A'],
    category: 'تخت و گهواره',
    name: 'تخت نوزاد چوبی مدل رویا',
    price: 1300000,
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mt: 3,
      }}
    >
      <Title text={title} />
      <Swiper slidesPerView="auto" spaceBetween={16} style={{ width: '100%' }}>
        {products.map((product) => (
          <SwiperSlide key={product.id} style={{ width: 260 }}>
            <ProductCard
              image={product.image}
              colors={product.colors}
              category={product.category}
              name={product.name}
              price={product.price}
              addToCartText={addToCartText}
              size="md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
