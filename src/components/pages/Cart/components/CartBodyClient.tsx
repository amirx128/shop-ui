'use client';

import { Box, Container } from '@mui/material';
import { useState } from 'react';
import ProductCardCart from './ProductCardCart';
import ProductsNeedSection from './ProductsNeedSection';
import CartSummarySection from './CartSummarySection';
import CartFooter from './CartFooter';
import { CartProduct } from '../types/cart';
import { updateCartItemQuantity } from '@/services/cartService';

interface CartBodyClientProps {
  initialProducts: CartProduct[];
  locale: string;
  currency: string;
  stepperLabels: {
    increase: string;
    decrease: string;
    remove: string;
  };
  productsNeedTitle: string;
  addToCartText: string;
  summaryLabels: {
    itemsPrice: string;
    cartTotal: string;
    savings: string;
  };
  savingsValue: number;
}

export default function CartBodyClient({
  initialProducts,
  locale,
  currency,
  stepperLabels,
  productsNeedTitle,
  addToCartText,
  summaryLabels,
  savingsValue,
}: CartBodyClientProps) {
  const [products, setProducts] = useState<CartProduct[]>(initialProducts);

  const handleQuantityChange = async (
    productId: string,
    quantity: number,
    skuId?: string | null,
  ) => {
    const existingProduct = products.find((product) => product.id === productId);
    if (!existingProduct || existingProduct.quantity === quantity) {
      return;
    }

    const previousQuantity = existingProduct.quantity;

    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      )
    );

    try {
      await updateCartItemQuantity(productId, quantity, skuId);
    } catch (error) {
      console.error('Unable to update cart item quantity', error);
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId ? { ...product, quantity: previousQuantity } : product
        )
      );
    }
  };

  const handleRemove = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const totalQuantity = products.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );

  const formattedTotal = `${totalPrice.toLocaleString(locale)} ${currency}`;
  const formattedSavings = `${savingsValue.toLocaleString(locale)} ${currency}`;

  return (
    <Container sx={{ overflowX: 'hidden', pb: 10 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {products.map((product) => (
          <ProductCardCart
            key={product.id}
            product={product}
            locale={locale}
            currency={currency}
            stepperLabels={stepperLabels}
            onRemove={() => handleRemove(product.id)}
            onQuantityChange={(quantity) =>
              handleQuantityChange(product.id, quantity, product.skuId)
            }
          />
        ))}
      </Box>

      <ProductsNeedSection
        title={productsNeedTitle}
        addToCartText={addToCartText}
      />

      <CartSummarySection
        rows={[
          {
            title: `${summaryLabels.itemsPrice} (${totalQuantity})`,
            value: formattedTotal,
          },
          {
            title: summaryLabels.cartTotal,
            value: formattedTotal,
          },
          {
            title: summaryLabels.savings,
            value: formattedSavings,
            color: 'success.main',
          },
        ]}
      />
    </Container>
  );
}
