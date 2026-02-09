'use client';

import { Box, Typography } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from 'next/image';
import Button from './Button';

interface ProductCompareCardProps {
  image: string;
  category: string;
  name: string;
  price: number;
  originalPrice?: number;
  color: string;
  addToCartText: string;
  locale: string;
  currency: string;
  onAddToCart?: () => void;
  isAddToCartLoading?: boolean;
}

export default function ProductCompareCard({
  image,
  category,
  name,
  price,
  originalPrice,
  color,
  addToCartText,
  locale,
  currency,
  onAddToCart,
  isAddToCartLoading,
}: ProductCompareCardProps) {
  const formatPrice = (value: number) => value.toLocaleString(locale);

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 225,
        }}
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: '24px',
        }}
      >
        <Typography variant="caption" sx={{ color: 'caption', fontSize: '10px' }}>
          {category}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, fontSize: '18px' }}
        >
          {name}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {originalPrice ? (
              <Typography
                variant="caption"
                sx={{ color: 'caption', fontSize: '10px' }}
              >
                {`${formatPrice(originalPrice)} ${currency}`}
              </Typography>
            ) : null}
            <Typography
              variant="subtitle1"
              sx={{
                color: 'secondary.main',
                fontWeight: 700,
                textAlign: 'left',
              }}
            >
              {`${formatPrice(price)} ${currency}`}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '4px',
              backgroundColor: color,
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Button
            sx={{ px: 3 }}
            radius="full"
            onClick={onAddToCart}
            disabled={isAddToCartLoading}
          >
            {addToCartText}
          </Button>
          <Box
            sx={{
              position: 'relative',
              width: 24,
              height: 24,
              '& .favorite-outline': {
                opacity: 1,
                transition: 'opacity 0.2s ease',
                color: 'text.secondary',
              },
              '& .favorite-filled': {
                position: 'absolute',
                inset: 0,
                opacity: 0,
                transition: 'opacity 0.2s ease',
                color: 'error.main',
              },
              '&:hover .favorite-outline': {
                opacity: 0,
              },
              '&:hover .favorite-filled': {
                opacity: 1,
              },
            }}
          >
            <FavoriteBorderOutlinedIcon className="favorite-outline" />
            <FavoriteIcon className="favorite-filled" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
