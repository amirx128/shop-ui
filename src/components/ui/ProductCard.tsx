'use client';

import { useState } from 'react';
import { Box, Typography, SxProps, Theme } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import Image from 'next/image';
import Button from './Button';

export type ProductCardFavoriteToggle = (
  productId: string,
  nextValue: boolean
) => Promise<boolean | void> | boolean | void;

interface ProductCardProps {
  image: string;
  colors: string[];
  category: string;
  name: string;
  price: number;
  originalPrice?: number;
  addToCartText: string;
  size?: 'full' | 'md';
  backgroundColor?: string;
  defaultFavorite?: boolean;
  onCompareClick?: () => void;
  onAddToCart?: () => void;
  isAddToCartLoading?: boolean;
  detailUrl?: string;
  onCardClick?: () => void;
  productId?: string;
  onFavoriteToggle?: ProductCardFavoriteToggle;
}

const formatPrice = (price: number) => price.toLocaleString('fa-IR');

const getTitleProps = (detailUrl?: string) => {
  if (!detailUrl) {
    return {
      component: 'span' as const,
    };
  }

  return {
    component: 'a' as const,
    href: detailUrl,
    target: '_blank',
    rel: 'noreferrer',
  };
};

export default function ProductCard({
  image,
  colors,
  category,
  name,
  price,
  originalPrice,
  addToCartText,
  size = 'full',
  backgroundColor = 'transparent',
  defaultFavorite = false,
  onCompareClick,
  onAddToCart = () => {},
  isAddToCartLoading = false,
  detailUrl,
  onCardClick,
  productId,
  onFavoriteToggle,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const titleProps = getTitleProps(detailUrl);
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick();
    }
  };

  const handleFavoriteButtonClick = async () => {
    const nextValue = !isFavorite;
    setIsFavorite(nextValue);

    if (!productId || !onFavoriteToggle) {
      return;
    }

    let handled = true;
    try {
      const result = await Promise.resolve(
        onFavoriteToggle(productId, nextValue)
      );
      if (result === false) {
        handled = false;
      }
    } catch {
      handled = false;
    }

    if (!handled) {
      setIsFavorite(!nextValue);
    }
  };

  if (size === 'md') {
    return (
      <Box
        onClick={onCardClick ? handleCardClick : undefined}
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          backgroundColor,
          cursor: onCardClick ? 'pointer' : undefined,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
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
              objectFit: 'fill',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            padding: '14px 16px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2,
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
            </Box>

            <Typography
              {...titleProps}
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                fontSize: '18px',
                color: 'text.primary',
                textDecoration: detailUrl ? 'none' : undefined,
                '&:hover': detailUrl
                  ? {
                      color: 'secondary.main',
                    }
                  : undefined,
              }}
            >
              {name}
            </Typography>

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
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 0.25,
                }}
              >
                {originalPrice ? (
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.disabled',
                      textDecoration: 'line-through',
                    }}
                  >
                    {formatPrice(originalPrice)} تومان
                  </Typography>
                ) : null}
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
                      width: 16,
                      height: 16,
                      borderRadius: '2px',
                      backgroundColor: color,
                    }}
                  />
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
                  <Button
                    startIcon={<ShoppingBasketOutlinedIcon />}
                    sx={{ alignSelf: 'flex-end' }}
                    onClick={(event) => {
                      event.stopPropagation();
                      onAddToCart?.();
                    }}
                    disabled={isAddToCartLoading}
                  >
                {addToCartText}
              </Button>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box
                  sx={{
                    cursor: 'pointer',
                    color: isFavorite ? 'error.main' : 'text.primary',
                    '&:hover': {
                      color: 'error.main',
                    },
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleFavoriteButtonClick();
                  }}
                >
                  {isFavorite ? (
                    <FavoriteIcon fontSize="small" color="error" />
                  ) : (
                    <FavoriteBorderOutlinedIcon fontSize="small" />
                  )}
                </Box>
                <Box
                  sx={{
                    cursor: 'pointer',
                    color: 'text.primary',
                    '&:hover': {
                      color: 'secondary.main',
                    },
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    onCompareClick?.();
                  }}
                >
                  <CompareArrowsOutlinedIcon fontSize="small" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
      <Box
        onClick={onCardClick ? handleCardClick : undefined}
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          padding: '14px 16px',
          width: '100%',
          backgroundColor,
          cursor: onCardClick ? 'pointer' : undefined,
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
                key={`${color}-${index}`}
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
              onClick={(event) => {
                event.stopPropagation();
                handleFavoriteButtonClick();
              }}
            >
              {isFavorite ? (
                <FavoriteIcon fontSize="small" color="error" />
              ) : (
                <FavoriteBorderOutlinedIcon fontSize="small" />
              )}
            </Box>
          </Box>

          <Typography
            {...titleProps}
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              fontSize: '18px',
              color: 'text.primary',
              textDecoration: detailUrl ? 'none' : undefined,
              '&:hover': detailUrl
                ? {
                    color: 'secondary.main',
                  }
                : undefined,
            }}
          >
            {name}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
            {originalPrice ? (
              <Typography
                variant="caption"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                {formatPrice(originalPrice)} تومان
              </Typography>
            ) : null}
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
          </Box>

          <Button
            startIcon={<ShoppingBasketOutlinedIcon />}
            sx={{ alignSelf: 'flex-end' }}
            onClick={(event) => {
              event.stopPropagation();
              onAddToCart?.();
            }}
            disabled={isAddToCartLoading}
          >
            {addToCartText}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
