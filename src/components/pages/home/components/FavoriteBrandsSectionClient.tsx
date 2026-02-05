'use client';

import { Box, Container, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import type { HomeFavoriteBrandsTranslations } from '../types';

interface FavoriteBrandsSectionClientProps {
  translations: HomeFavoriteBrandsTranslations;
}

export default function FavoriteBrandsSectionClient({
  translations,
}: FavoriteBrandsSectionClientProps) {
  return (
    <Box sx={{ py: 4 }}>
      <Container sx={{ overflowX: 'hidden' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 0.5,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {translations.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {translations.subtitle}
            </Typography>
          </Box>

          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            slidesPerView="auto"
            spaceBetween={12}
            style={{ width: '100%' }}
          >
            {translations.brands.map((brand) => (
              <SwiperSlide key={brand} style={{ width: 107 }}>
                <Box
                  sx={(theme) => ({
                    width: 107,
                    height: 59,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.secondary.main, 0.06),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  })}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {brand}
                  </Typography>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
}
