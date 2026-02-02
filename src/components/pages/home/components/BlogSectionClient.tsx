'use client';

import { Box, Container, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Button from '@/components/ui/Button';
import BlogCard from './BlogCard';
import type { HomeBlogPost, HomeBlogTranslations } from '../types';

interface BlogSectionClientProps {
  translations: HomeBlogTranslations;
  posts: HomeBlogPost[];
}

export default function BlogSectionClient({
  translations,
  posts,
}: BlogSectionClientProps) {
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
            slidesPerView="auto"
            spaceBetween={16}
            style={{ width: '100%' }}
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id} style={{ width: 280 }}>
                <BlogCard
                  post={post}
                  ctaLabel={translations.cardCta}
                  href="#"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Button
            fullWidth
            variant="outline"
            endIcon={<ArrowBackIcon />}
            sx={{
              borderRadius: '999px',
              py: 1.25,
              textTransform: 'none',
              borderColor: 'secondary.main',
              color: 'secondary.main',
            }}
          >
            {translations.viewAll}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
