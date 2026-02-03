'use client';

import { Box, Container, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import TestimonialCart from './TestimonialCart';
import type { HomeTestimonial, HomeTestimonialsTranslations } from '../types';

interface TestimonialsSectionClientProps {
  translations: HomeTestimonialsTranslations;
  testimonials: HomeTestimonial[];
}

export default function TestimonialsSectionClient({
  translations,
  testimonials,
}: TestimonialsSectionClientProps) {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: alpha(theme.palette.secondary.main, 0.05),
        py: 4,
      })}
    >
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
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            slidesPerView="auto"
            spaceBetween={12}
            style={{ width: '100%' }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} style={{ width: 300 }}>
                <TestimonialCart testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
}
