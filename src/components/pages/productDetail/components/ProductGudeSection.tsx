'use client';

import { useState } from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ProductFullModal from './ProductFullModal';

type ProductGudeSectionProps = {
  translations: {
    title: string;
    emptyMessage: string;
  };
  usageGuide?: string | null;
};

export default function ProductGudeSection({
  translations,
  usageGuide,
}: ProductGudeSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasGuide = Boolean(usageGuide?.trim());
  const emptyMessage =
    translations.emptyMessage || 'هنوز برای راهنمای استفاده متنی ثبت نشده است.';
  const title = translations.title || 'راهنمای استفاده';

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
                {title}
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
              {title}
            </Typography>

            {hasGuide ? (
              <Box
                component="div"
                sx={{
                  lineHeight: 1.8,
                  color: 'text.secondary',
                }}
                dangerouslySetInnerHTML={{ __html: usageGuide ?? '' }}
              />
            ) : (
              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1.8,
                  color: 'text.secondary',
                }}
              >
                {emptyMessage}
              </Typography>
            )}
          </Box>

          <Divider />
        </Box>
      </Container>

      <ProductFullModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        content={hasGuide ? undefined : emptyMessage}
        contentHtml={hasGuide ? usageGuide ?? '' : undefined}
      />
    </>
  );
}
