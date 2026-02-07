'use client';

import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { toast } from 'react-toastify';
import Button from '@/components/ui/Button';
import { addProductToCart, checkoutCart } from '@/services/cartService';

interface ProductDetailFooterProps {
  price: number;
  addToCartText: string;
  productId: string;
  unitOfMeasure?: string;
  propertyValueIds?: string[];
}

export default function ProductDetailFooter({
  price,
  addToCartText,
  productId,
  unitOfMeasure,
  propertyValueIds,
}: ProductDetailFooterProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (value: number) => value.toLocaleString('fa-IR');

  const handleAddToCart = async () => {
    if (isProcessing) {
      return;
    }

    setIsProcessing(true);
    try {
      await addProductToCart({
        productId,
        quantity: 1,
        unitOfMeasure: unitOfMeasure ?? 'unit',
        unitPrice: price,
        discountPerUnit: 0,
        rowPrice: price,
        propertyValueIds: propertyValueIds?.length ? propertyValueIds : undefined,
      });

      await checkoutCart();
      toast.success('Ø³ÙØ§Ø±Ø´ Ù…Ø´ØªØ±ÛŒ Ø«Ø¨Øª Ø´Ø¯.');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Ø®Ø·Ø§ Ø¯Ø± Ø§ÙØ²ÙˆØ¯Ù† Ø¨Ù‡ Ø³Ø¨Ø¯ Ø®Ø±ÛŒØ¯.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'background.default',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.25)',
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            py: 2,
          }}
        >
          <Button
            startIcon={<ShoppingBasketOutlinedIcon />}
            onClick={handleAddToCart}
            disabled={isProcessing}
          >
            {addToCartText}
          </Button>

          <Typography
            variant="body1"
            sx={{
              color: 'secondary.main',
              fontSize: '24px',
              fontWeight: 600,
            }}
          >
            {formatPrice(price)} ريال
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
