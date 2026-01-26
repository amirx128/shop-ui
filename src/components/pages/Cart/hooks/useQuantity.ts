'use client';

import { useState } from 'react';

interface UseQuantityOptions {
  initialQuantity: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export default function useQuantity({
  initialQuantity,
  min = 1,
  max,
  onChange,
}: UseQuantityOptions) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const updateQuantity = (value: number) => {
    const clamped =
      typeof max === 'number'
        ? Math.min(Math.max(value, min), max)
        : Math.max(value, min);

    setQuantity(clamped);
    onChange?.(clamped);
  };

  const increase = () => updateQuantity(quantity + 1);
  const decrease = () => updateQuantity(quantity - 1);

  return {
    quantity,
    increase,
    decrease,
  };
}
