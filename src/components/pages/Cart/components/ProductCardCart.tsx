import { Box, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from 'next/image';
import QuantityStepper from './QuantityStepper';
import { CartProduct } from '../types/cart';

interface ProductCardCartProps {
  product: CartProduct;
  locale: string;
  currency: string;
  stepperLabels: {
    increase: string;
    decrease: string;
    remove: string;
  };
  onRemove?: () => void;
  onQuantityChange?: (quantity: number) => void;
}

export default function ProductCardCart({
  product,
  locale,
  currency,
  stepperLabels,
  onRemove,
  onQuantityChange,
}: ProductCardCartProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '12px',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '16px',
        py: '14px',
        px: '16px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Box
          sx={{
            width: 134,
            height: 86,
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="134px"
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <QuantityStepper
          initialQuantity={product.quantity}
          labels={stepperLabels}
          onRemove={onRemove}
          onQuantityChange={onQuantityChange}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          flex: 1,
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontSize: '10px', fontWeight: 500, color: 'text.secondary' }}
          >
            {product.category}
          </Typography>
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
            <FavoriteBorderIcon className="favorite-outline" />
            <FavoriteIcon className="favorite-filled" />
          </Box>
        </Box>

        <Typography variant="h6" component="h2">
          {product.name}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {product.variants.map((variant) => (
            <Box
              key={`${variant.label}-${variant.value}`}
              sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {variant.label}:
              </Typography>
              {variant.color ? (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: variant.color,
                  }}
                />
              ) : null}
              <Typography variant="body2">{variant.value}</Typography>
            </Box>
          ))}
        </Box>

        <Typography
          variant="subtitle1"
          sx={{ color: 'secondary.main', textAlign: 'left', mt: 'auto' }}
        >
          {`${product.price.toLocaleString(locale)} ${currency}`}
        </Typography>
      </Box>
    </Box>
  );
}
