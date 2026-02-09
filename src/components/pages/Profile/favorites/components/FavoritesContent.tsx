'use client';

import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import FavoritesProductsList from './FavoritesProductsList';
import { getFavoriteProducts } from '@/services/favoritesService';
import type { FavoriteProduct } from '@/types/favorites';

interface FavoritesContentProps {
  addToCartText: string;
}

export default function FavoritesContent({ addToCartText }: FavoritesContentProps) {
  const [products, setProducts] = useState<FavoriteProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        const items = await getFavoriteProducts();
        if (isActive) {
          setProducts(items);
        }
      } catch (err) {
        if (!isActive) {
          return;
        }
        setError(err instanceof Error ? err.message : 'Unable to load favorites.');
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadFavorites();

    return () => {
      isActive = false;
    };
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          py: 8,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 8 }}>
        <Typography align="center" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box sx={{ py: 8 }}>
        <Typography align="center" color="text.secondary">
          هیچ آیتمی در فهرست علاقه‌مندی شما ثبت نشده است.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      <FavoritesProductsList products={products} addToCartText={addToCartText} />
    </Box>
  );
}
