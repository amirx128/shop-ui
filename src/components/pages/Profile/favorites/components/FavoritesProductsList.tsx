'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import ProductCard from '@/components/ui/ProductCard';
import { addProductToCartWithDefaultSku, checkoutCart } from '@/services/cartService';
import type { FavoriteProduct } from '../types/favorites';

interface FavoritesProductsListProps {
  products: FavoriteProduct[];
  addToCartText: string;
}

export default function FavoritesProductsList({
  products,
  addToCartText,
}: FavoritesProductsListProps) {
  const [processingProductId, setProcessingProductId] = useState<string | null>(null);

  const handleAddToCart = async (productId: string, price: number) => {
    setProcessingProductId(productId);
    try {
      await addProductToCartWithDefaultSku({
        productId,
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
        current === productId ? null : current
      );
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image={product.image ?? '/images/tempproduct.png'}
          colors={product.colors}
          category={product.category}
          name={product.name}
          price={product.price}
          addToCartText={addToCartText}
          isFavorite
          productId={product.id}
          onAddToCart={() => handleAddToCart(product.id, product.price)}
          isAddToCartLoading={processingProductId === product.id}
        />
      ))}
    </Box>
  );
}
