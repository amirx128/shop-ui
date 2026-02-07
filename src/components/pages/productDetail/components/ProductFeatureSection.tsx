'use client';

import { useState } from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import FeatureItem from './FeatureItem';
import ProductFullModal from './ProductFullModal';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';

interface ProductFeatureSectionProps {
  translations: {
    productFeatures: string;
  };
  features: string[];
  modalFeatures: {
    title: string;
    value: string;
  }[];
}

export default function ProductFeatureSection({
  translations,
  features,
  modalFeatures,
}: ProductFeatureSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Container>
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <PlaylistAddCheckOutlinedIcon />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                }}
              >
                {translations.productFeatures}
              </Typography>
            </Box>

            <ChevronLeftOutlinedIcon
              onClick={() => setIsModalOpen(true)}
              sx={{ cursor: 'pointer' }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            {features.length === 0 ? (
              <Typography color="text.secondary">No details available.</Typography>
            ) : (
              features.map((feature) => (
                <FeatureItem key={feature} featureName={feature} />
              ))
            )}
          </Box>

          <Divider />
        </Box>
      </Container>

      <ProductFullModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={translations.productFeatures}
        features={modalFeatures}
      />
    </>
  );
}
