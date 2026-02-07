'use client';

import { Box, Container, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProductCard, {
  ProductCardFavoriteToggle,
} from '@/components/ui/ProductCard';
import { ProductRelationSummary } from '../types';

interface SuggestionProductSectionProps {
  addToCartText: string;
  products: ProductRelationSummary[];
  locale: string;
  onAddToCart?: (product: ProductRelationSummary) => void;
  processingProductId?: string | null;
  onFavoriteToggle?: ProductCardFavoriteToggle;
}

const fallbackImage = '/images/tempproduct.png';

export default function SuggestionProductSection({
  addToCartText,
  products,
  locale,
  onAddToCart,
  processingProductId,
  onFavoriteToggle,
}: SuggestionProductSectionProps) {
  const title = 'محصولات پیشنهادی';
  const items = products ?? [];

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
        {items.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            محصولات پیشنهادی برای نمایش موجود نیست.
          </Typography>
        ) : (
          <Swiper
            slidesPerView="auto"
            spaceBetween={16}
            style={{ width: '100%' }}
          >
            {items.map((product) => {
              const image = product.mainImageUrl ?? fallbackImage;
              const displayColors =
                product.colorCodes.length > 0
                  ? product.colorCodes
                  : ['#E5E7EB'];
              const colorLabel =
                product.colorCodes.length > 0
                  ? product.colorCodes.join(', ')
                  : 'دارای کد رنگ نیست';
              const detailUrl = `/${locale}/mobile/product/${encodeURIComponent(
                product.slug
              )}`;
              const openProduct = () => window.open(detailUrl, '_blank');

              return (
                <SwiperSlide key={product.id} style={{ width: 260 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  <ProductCard
                    image={image}
                    colors={displayColors}
                    category={product.categoryName}
                    name={product.name}
                    price={Number(product.priceRial)}
                    addToCartText={addToCartText}
                    size="md"
                    detailUrl={detailUrl}
                    onCardClick={openProduct}
                    onAddToCart={() => onAddToCart?.(product)}
                    isAddToCartLoading={processingProductId === product.id}
                    productId={product.id}
                    onFavoriteToggle={onFavoriteToggle}
                  />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.25,
                      }}
                    > 
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </Box>
    </Container>
  );
}
