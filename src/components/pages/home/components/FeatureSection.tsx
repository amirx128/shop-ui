'use client';
import { Box, Container } from '@mui/material';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import FeatureCart from './FeatureCart';
import type { HomeFeatureTranslations } from '../types';

interface FeatureSectionProps {
  translations: HomeFeatureTranslations;
}

const iconSx = { fontSize: 32 };

export default function FeatureSection({ translations }: FeatureSectionProps) {
  return (
    <Box sx={{ py: 4 }}>
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <FeatureCart
            color="success"
            icon={<ApartmentOutlinedIcon sx={iconSx} />}
            title={translations.organizations.title}
            subtitle={translations.organizations.subtitle}
          />
          <FeatureCart
            color="secondary"
            icon={<HeadsetMicOutlinedIcon sx={iconSx} />}
            title={translations.support.title}
            subtitle={translations.support.subtitle}
          />
          <FeatureCart
            color="primary"
            icon={<GppGoodOutlinedIcon sx={iconSx} />}
            title={translations.authenticity.title}
            subtitle={translations.authenticity.subtitle}
          />
          <FeatureCart
            color="error"
            icon={<StyleOutlinedIcon sx={iconSx} />}
            title={translations.pricing.title}
            subtitle={translations.pricing.subtitle}
          />
        </Box>
      </Container>
    </Box>
  );
}
