'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import Divider from '@/components/ui/Divider';
import CompareCart from './CompareCart';
import { CompareProduct } from '../types/compare';

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

  const handleRemove = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
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
          />
          {index < products.length - 1 ? <Divider /> : null}
        </Box>
      ))}
    </Box>
  );
}
