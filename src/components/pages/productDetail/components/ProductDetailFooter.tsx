'use client';

import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { toast } from 'react-toastify';
import Button from '@/components/ui/Button';
import { addProductToCart, checkoutCart } from '@/services/cartService';
import { DefaultSkuInfo } from '@/types/defaultSku';

interface ProductDetailFooterProps {
  price: number;
  addToCartText: string;
  productId: string;
  unitOfMeasure?: string;
  defaultSku?: DefaultSkuInfo | null;
}

export default function ProductDetailFooter({
  price,
  addToCartText,
  productId,
  unitOfMeasure,
  defaultSku,
}: ProductDetailFooterProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (value: number) => value.toLocaleString('fa-IR');

  const handleAddToCart = async () => {
    if (isProcessing) {
      return;
    }

    setIsProcessing(true);
    try {
      const skuId = defaultSku?.id;
      const availableQty = defaultSku?.availableQty ?? 0;
      if (!skuId || availableQty < 1) {
        throw new Error('هیچ SKU با موجودی بیشتر از 1 پیدا نشد.');
      }

      await addProductToCart({
        productId,
        skuId,
        quantity: 1,
        unitOfMeasure: unitOfMeasure ?? 'unit',
        unitPrice: price,
        discountPerUnit: 0,
        rowPrice: price,
      });

      await checkoutCart();
      toast.success('سفارش مشتری ثبت شد.');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'خطا در افزودن به سبد خرید.'
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
            {formatPrice(price)} تومان
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
