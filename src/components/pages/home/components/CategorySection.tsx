'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Container, Typography } from '@mui/material';
import type { HomeCategoryTranslations } from '../types';

interface CategorySectionProps {
  translations: HomeCategoryTranslations;
}

const categories = [
  {
    key: 'transport',
    bg: '/images/home/categories/cat1-bg.png',
    image: '/images/home/categories/cat1.png',
  },
  {
    key: 'hygiene',
    bg: '/images/home/categories/cat2-bg.png',
    image: '/images/home/categories/cat2.jpg',
  },
  {
    key: 'stationery',
    bg: '/images/home/categories/cat3-bg.png',
    image: '/images/home/categories/cat3.png',
  },
  {
    key: 'clothing',
    bg: '/images/home/categories/cat4-bg.png',
    image: '/images/home/categories/cat4.jpg',
  },
  {
    key: 'room',
    bg: '/images/home/categories/cat5-bg.png',
    image: '/images/home/categories/cat5.jpg',
  },
  {
    key: 'toys',
    bg: '/images/home/categories/cat6-bg.png',
    image: '/images/home/categories/cat6.png',
  },
] as const;

export default function CategorySection({
  translations,
}: CategorySectionProps) {
  const labels: Record<(typeof categories)[number]['key'], string> = {
    transport: translations.transport,
    hygiene: translations.hygiene,
    stationery: translations.stationery,
    clothing: translations.clothing,
    room: translations.room,
    toys: translations.toys,
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            columnGap: 2,
            rowGap: 3,
            justifyItems: 'start',
            position: 'relative',
          }}
        >
          <Image
            src="/images/home/star-2.png"
            alt={'star'}
            width={19}
            height={41}
            priority
            className="w-4.75 h-10.25 absolute -top-14 left-0"
          />
          {categories.map((category) => {
            const label = labels[category.key];
            return (
              <Box
                key={category.key}
                component={Link}
                href="#"
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  justifyItems: 'center',
                  gap: '8px',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: 103,
                    height: 103,
                  }}
                >
                  <Image
                    src={category.bg}
                    alt=""
                    width={103}
                    height={103}
                    sizes="103px"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      border: '4px solid #fff',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={category.image}
                      alt={label}
                      fill
                      sizes="80px"
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ textAlign: 'center', width: 103 }}
                >
                  {label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
