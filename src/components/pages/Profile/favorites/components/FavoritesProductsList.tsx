import { Box } from '@mui/material';
import ProductCard from '@/components/ui/ProductCard';
import type { FavoriteProduct } from '../types/favorites';

interface FavoritesProductsListProps {
  products: FavoriteProduct[];
  addToCartText: string;
}

export default function FavoritesProductsList({
  products,
  addToCartText,
}: FavoritesProductsListProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image={product.image}
          colors={product.colors}
          category={product.category}
          name={product.name}
          price={product.price}
          addToCartText={addToCartText}
          defaultFavorite
        />
      ))}
    </Box>
  );
}

