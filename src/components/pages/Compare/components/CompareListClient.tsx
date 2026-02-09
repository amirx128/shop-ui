'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import Divider from '@/components/ui/Divider';
import CompareCart from './CompareCart';
import { CompareProduct } from '../types/compare';
import { addProductToCartWithDefaultSku, checkoutCart } from '@/services/cartService';
import { FALLBACK_PRODUCT_ID } from '@/lib/fallbackProduct';

interface CompareListClientProps {
  initialProducts: CompareProduct[];
  locale: string;
  translations: {
    remove: string;
    addToCart: string;
    currency: string;
  };
}

export default function CompareListClient({
  initialProducts,
  locale,
  translations,
}: CompareListClientProps) {
  const [products, setProducts] = useState<CompareProduct[]>(initialProducts);
  const [processingProductId, setProcessingProductId] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleAddToCart = async (cardId: string, price: number) => {
    setProcessingProductId(cardId);
    try {
      await addProductToCartWithDefaultSku({
        productId: FALLBACK_PRODUCT_ID,
        quantity: 1,
        unitOfMeasure: 'unit',
        unitPrice: price,
        discountPerUnit: 0,
        rowPrice: price,
      });
      await checkoutCart();
      toast.success('سفارش مشتری ثبت شد.');
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'خطا در افزودن محصول به سبد خرید.'
      );
    } finally {
      setProcessingProductId((current) =>
        current === cardId ? null : current
      );
    }
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {products.map((product, index) => (
        <Box
          key={product.id}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <CompareCart
            product={product}
            locale={locale}
            currency={translations.currency}
            removeLabel={translations.remove}
            addToCartText={translations.addToCart}
            onRemove={() => handleRemove(product.id)}
            onAddToCart={() => handleAddToCart(product.id, product.price)}
            isAddToCartLoading={processingProductId === product.id}
          />
          {index < products.length - 1 ? <Divider /> : null}
        </Box>
      ))}
    </Box>
  );
}
