'use client';

import { useState } from 'react';
import { Box, Typography, SxProps, Theme } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import Image from 'next/image';
import Button from './Button';

interface ProductCardProps {
  image: string;
  colors: string[];
  category: string;
  name: string;
  price: number;
  addToCartText: string;
}

export default function ProductCard({
  image,
  colors,
  category,
  name,
  price,
  addToCartText,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR');
  };

  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        padding: '14px 16px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: 131,
              height: 121,
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <Image
              src={image}
              alt={name}
              fill
              sizes="131px"
              style={{
                objectFit: 'cover',
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 1,
            }}
          >
            {colors.map((color, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: color,
                }}
              />
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
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
              variant="caption"
              sx={{
                color: 'caption',
                fontSize: '10px',
              }}
            >
              {category}
            </Typography>
            <Box
              sx={{
                cursor: 'pointer',
                color: isFavorite ? 'error.main' : 'text.primary',
                '&:hover': {
                  color: 'error.main',
                },
              }}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              {isFavorite ? (
                <FavoriteIcon fontSize="small" color="error" />
              ) : (
                <FavoriteBorderOutlinedIcon fontSize="small" />
              )}
            </Box>
          </Box>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              fontSize: '18px',
            }}
          >
            {name}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'secondary.main',
              fontWeight: 700,
              textAlign: 'left',
            }}
          >
            {formatPrice(price)} تومان
          </Typography>

          <Button
            startIcon={<ShoppingBasketOutlinedIcon />}
            sx={{ alignSelf: 'flex-end' }}
          >
            {addToCartText}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
