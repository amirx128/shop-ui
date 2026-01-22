'use client';

import { useState } from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ProductFullModal from './ProductFullModal';

export default function ProductGudeSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const guideTitle = '\u0631\u0627\u0647\u0646\u0645\u0627\u06cc \u0627\u0633\u062a\u0641\u0627\u062f\u0647';
  const guideSubtitle =
    '\u0646\u062d\u0648\u0647 \u0627\u0633\u062a\u0641\u0627\u062f\u0647';
  const guideText =
    'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi';

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
              <ErrorOutlineOutlinedIcon />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                }}
              >
                {guideTitle}
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
              {guideSubtitle}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.8,
                color: 'text.secondary',
              }}
            >
              {guideText}
            </Typography>
          </Box>

          <Divider />
        </Box>
      </Container>

      <ProductFullModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={guideTitle}
        content={`${guideSubtitle}\n\n${guideText}`}
      />
    </>
  );
}
