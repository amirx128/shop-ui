'use client';

import { Box, Container, Divider, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProductCard from '@/components/ui/ProductCard';

interface SuggestionProductSectionProps {
  addToCartText: string;
}

export default function SuggestionProductSection({
  addToCartText,
}: SuggestionProductSectionProps) {
  const title =
    '\u0645\u062d\u0635\u0648\u0644\u0627\u062a \u067e\u06cc\u0634\u0646\u0647\u0627\u062f\u06cc';
  const products = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    image: '/images/tempproduct.png',
    colors: ['#52525B', '#898BFA', '#FF4C8B', '#E16203', '#27272A'],
    category: '\u0644\u0648\u0631\u0645 \u0627\u06cc\u067e\u0633\u0648\u0645',
    name: '\u062f\u0648\u062f\u0648\u062a\u0627\u0628 \u0646\u0648\u0632\u0627\u062f\u06cc \u0644\u0648\u0631\u0645 \u0627\u06cc\u067e\u0633\u0648\u0645',
    price: 1256000,
  }));

  return (
    <Container sx={{ overflowX: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          py: 2,
        }}
      >
        <Box
          sx={{
            width: 'max-content',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              borderBottom: 'solid 1px',
              borderBottomColor: 'secondary.main',
              pb: 1,
            }}
          >
            {title}
          </Typography>
        </Box>
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          style={{ width: '100%' }}
        >
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
    </Container>
  );
}
