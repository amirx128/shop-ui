'use client';

import { Box, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ProductCompareCard from '@/components/ui/ProductCompareCard';
import { CompareProduct } from '../types/compare';

interface CompareCartProps {
  product: CompareProduct;
  locale: string;
  currency: string;
  removeLabel: string;
  addToCartText: string;
  onRemove?: () => void;
  onAddToCart?: () => void;
  isAddToCartLoading?: boolean;
}

export default function CompareCart({
  product,
  locale,
  currency,
  removeLabel,
  addToCartText,
  onRemove,
  onAddToCart,
  isAddToCartLoading,
}: CompareCartProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={onRemove}
          startIcon={<CloseIcon />}
          variant="text"
          sx={{
            color: 'text.secondary',
            textTransform: 'none',
            minWidth: 'auto',
            px: 1.5,
            gap: 1,
          }}
        >
          {removeLabel}
        </Button>
      </Box>

      <ProductCompareCard
        image={product.image}
        category={product.category}
        name={product.name}
        price={product.price}
        originalPrice={product.originalPrice}
        color={product.color}
        addToCartText={addToCartText}
        currency={currency}
        locale={locale}
        onAddToCart={onAddToCart}
        isAddToCartLoading={isAddToCartLoading}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {product.features.map((feature, index) => (
          <Box
            key={`${product.id}-feature-${index}`}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <CheckCircleOutlineIcon
              sx={{ fontSize: 18, color: 'text.secondary' }}
            />
            <Typography variant="body2">{feature}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
