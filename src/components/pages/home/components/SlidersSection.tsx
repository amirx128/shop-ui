'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Box, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { HomeSliderTranslations } from '../types';

interface SlidersSectionProps {
  translations: HomeSliderTranslations;
}

const slides = [
  {
    key: 'slide1',
    background: '#688FFF',
    image: '/images/home/sliders/slider-1.png',
    imageAlign: 'right',
  },
  {
    key: 'slide2',
    background: '#FF6D68',
    image: '/images/home/sliders/slider-2.png',
    imageAlign: 'left',
  },
  {
    key: 'slide3',
    background: '#A968FF',
    image: '/images/home/sliders/slider-3.png',
    imageAlign: 'left',
  },
] as const;

export default function SlidersSection({
  translations,
}: SlidersSectionProps) {
  const titles: Record<(typeof slides)[number]['key'], string> = {
    slide1: translations.slides.slide1.title,
    slide2: translations.slides.slide2.title,
    slide3: translations.slides.slide3.title,
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {slides.map((slide) => (
            <Box
              key={slide.key}
              component={Link}
              href="#"
              sx={{
                position: 'relative',
                display: 'block',
                width: '100%',
                minHeight: 160,
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: slide.background,
                color: 'common.white',
                textDecoration: 'none',
                px: 2,
                py: 2.5,
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems:
                    slide.key === 'slide1' ? 'flex-end' : 'flex-start',
                  gap: 0.5,
                }}
              >
                <Typography variant="caption" sx={{ color: 'common.white' }}>
                  {translations.subtitle}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: 'common.white' }}
                >
                  {titles[slide.key]}
                </Typography>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    mt: 0.5,
                    color: 'common.white',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'common.white' }}>
                    {translations.cta}
                  </Typography>
                  <ArrowBackIcon fontSize="small" />
                </Box>
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  [slide.imageAlign]: 0,
                  width: '60%',
                  height: '100%',
                }}
              >
                <Image
                  src={slide.image}
                  alt={titles[slide.key]}
                  fill
                  sizes="(max-width: 600px) 70vw, 320px"
                  style={{ objectFit: 'contain', objectPosition: 'bottom' }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
