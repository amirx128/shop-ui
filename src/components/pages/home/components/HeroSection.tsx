'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { HomeHeroTranslations } from '../types';

interface HeroSectionProps {
  translations: HomeHeroTranslations;
  shopHref: string;
}

export default function HeroSection({
  translations,
  shopHref,
}: HeroSectionProps) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(85.34deg, #FFBE78 5.9%, #FED8B1 97.88%)',
        py: 4,
        pt: 8,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '8px',
          }}
        >
          <Image
            src="/images/home/rainbow.png"
            alt={translations.imageAlt}
            width={124}
            height={102}
            priority
            className="w-31 h-25.5 absolute bottom-0 -right-8"
          />
          <Box sx={{ width: '100%', maxWidth: 320, position: 'relative' }}>
            <Image
              src="/images/home/bee.png"
              alt={translations.imageAlt}
              width={38}
              height={43}
              priority
              className="w-8 h-10.75 absolute top-0 right-6"
            />
            <Image
              src="/images/home/cloud.png"
              alt={translations.imageAlt}
              width={64}
              height={47}
              priority
              className="w-16 h-11.75 absolute top-0 -right-16"
            />
            <Image
              src="/images/home/flower.png"
              alt={translations.imageAlt}
              width={44}
              height={44}
              priority
              className="w-11 h-11 absolute top-6 -right-10"
            />
            <Image
              src="/images/home/star.png"
              alt={translations.imageAlt}
              width={22}
              height={20}
              priority
              className="w-5.5 h-5 absolute bottom-4 right-0"
            />
            <Image
              src="/images/home/star.png"
              alt={translations.imageAlt}
              width={18}
              height={16}
              priority
              className="w-4.5 h-4 absolute top-4 left-0"
            />
            <Image
              src="/images/home/butterfly.png"
              alt={translations.imageAlt}
              width={50}
              height={37}
              priority
              className="w-12.5 h-9.25 absolute bottom-6.25 left-0"
            />
            <Image
              src="/images/home/heroBg.png"
              alt={translations.imageAlt}
              width={556}
              height={572}
              priority
              sizes="(max-width: 600px) 100vw, 320px"
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {translations.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {translations.subtitle}
          </Typography>
          <Button
            component={Link}
            href={shopHref}
            variant="contained"
            color="secondary"
            endIcon={<ArrowBackIcon />}
            sx={{
              textTransform: 'none',
              borderRadius: '999px',
              px: 3,
              py: 1.25,
              gap: 1,
            }}
          >
            {translations.cta}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
