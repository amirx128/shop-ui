'use client';

import { useState } from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ProductFullModal from './ProductFullModal';

interface ProductDescriptionSectionProps {
  translations: {
    productDescription: string;
    descriptionTitle: string;
    descriptionText: string;
    fullDescriptionTitle: string;
    fullDescriptionText: string;
  };
  description: string;
  fullDescription?: string;
}

export default function ProductDescriptionSection({
  translations,
  description,
  fullDescription,
}: ProductDescriptionSectionProps) {
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
              <ReceiptOutlinedIcon />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                }}
              >
                {translations.productDescription}
              </Typography>
            </Box>

            <ChevronLeftOutlinedIcon
              onClick={() => setIsModalOpen(true)}
              sx={{ cursor: 'pointer' }}
            />
          </Box>

          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                mb: 1,
              }}
            >
              {translations.descriptionTitle}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.8,
                color: 'text.secondary',
              }}
            >
              {description}
            </Typography>
          </Box>

          <Divider />
        </Box>
      </Container>

      <ProductFullModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={translations.productDescription}
        content={`${translations.fullDescriptionTitle}\n\n${fullDescription ?? description}`}
      />
    </>
  );
}
