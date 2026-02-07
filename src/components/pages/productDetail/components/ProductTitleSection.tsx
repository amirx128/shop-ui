'use client';

import { useState } from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from 'react-toastify';

interface ProductTitleSectionProps {
  category: string;
  productName: string;
  toastTranslations: {
    shareSuccess: string;
    shareError: string;
    copySuccess: string;
    copyError: string;
  };
}

export default function ProductTitleSection({
  category,
  productName,
  toastTranslations,
}: ProductTitleSectionProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          url: window.location.href,
        });
        toast.success(toastTranslations.shareSuccess);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
          toast.error(toastTranslations.shareError);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success(toastTranslations.copySuccess);
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        toast.error(toastTranslations.copyError);
      }
    }
  };

  return (
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
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: '20px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flex: 1,
              minWidth: 0,
            }}
          >
            {category ? `${category} · ${productName}` : productName}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 1,
            }}
          >
            <Box
              onClick={handleShare}
              sx={{
                cursor: 'pointer',
                color: 'text.primary',
                '&:hover': {
                  color: 'secondary.main',
                },
              }}
            >
              <ShareOutlinedIcon />
            </Box>

            <Box
              onClick={() => setIsFavorite(!isFavorite)}
              sx={{
                cursor: 'pointer',
                color: isFavorite ? 'error.main' : 'text.primary',
                '&:hover': {
                  color: 'error.main',
                },
              }}
            >
              {isFavorite ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </Box>
          </Box>
        </Box>

        <Divider />
      </Box>
    </Container>
  );
}
