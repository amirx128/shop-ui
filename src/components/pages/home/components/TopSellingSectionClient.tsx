'use client';

import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/ui/ProductCard';
import type {
  HomeTopSellingProduct,
  HomeTopSellingTranslations,
} from '../types';
import Image from 'next/image';

const tabKeys = ['all', 'newest', 'bestSelling', 'discounted'] as const;

type TabKey = (typeof tabKeys)[number];

interface TopSellingSectionClientProps {
  translations: HomeTopSellingTranslations;
  products: HomeTopSellingProduct[];
}

export default function TopSellingSectionClient({
  translations,
  products,
}: TopSellingSectionClientProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  const tabLabels: Record<TabKey, string> = {
    all: translations.tabs.all,
    newest: translations.tabs.newest,
    bestSelling: translations.tabs.bestSelling,
    discounted: translations.tabs.discounted,
  };

  const displayedProducts = products;

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
        py: 8,
        position: 'relative',
      })}
    >
      <Image
        src="/images/home/butterfly.png"
        alt={'image'}
        width={52}
        height={38}
        priority
        className="w-13 h-9.75 absolute -top-4 left-6"
      />
      <Image
        src="/images/home/star-2.png"
        alt={'image'}
        width={39}
        height={86}
        priority
        className="w-9.75 h-21.5 absolute top-0 right-6"
      />
      <Container sx={{ overflowX: 'hidden' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {translations.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {translations.subtitle}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {tabKeys.map((key) => {
              const isActive = activeTab === key;
              return (
                <Button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  variant="solid"
                  sx={{
                    borderRadius: '999px',
                    px: '20px',
                    py: '8px',
                    minWidth: 'auto',
                    backgroundColor: isActive ? 'primary.main' : 'common.white',
                    color: isActive ? 'common.white' : 'primary.main',
                    '&:hover': {
                      backgroundColor: isActive
                        ? 'primary.dark'
                        : alpha('#223A78', 0.08),
                    },
                  }}
                >
                  {tabLabels[key]}
                </Button>
              );
            })}
          </Box>

          <Swiper
            slidesPerView="auto"
            spaceBetween={16}
            style={{ width: '100%' }}
          >
            {displayedProducts.map((product) => (
              <SwiperSlide key={product.id} style={{ width: 260 }}>
                <ProductCard
                  image={product.image}
                  colors={product.colors}
                  category={product.category}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  addToCartText={translations.addToCart}
                  size="md"
                  backgroundColor="common.white"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Button
            fullWidth
            variant="solid"
            endIcon={<ArrowBackIcon />}
            sx={{
              borderRadius: '999px',
              py: 1.25,
              textTransform: 'none',
            }}
          >
            {translations.viewMore}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
