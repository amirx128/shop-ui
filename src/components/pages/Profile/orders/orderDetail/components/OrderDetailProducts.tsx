import { Box } from '@mui/material';
import ProductOrderCart, {
  ProductOrderCartLabels,
  ProductOrderCartProduct,
} from '@/components/ui/ProductOrderCart';

interface OrderDetailProductsProps {
  products: ProductOrderCartProduct[];
  labels: ProductOrderCartLabels;
}

export default function OrderDetailProducts({
  products,
  labels,
}: OrderDetailProductsProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {products.map((product) => (
        <ProductOrderCart key={product.id} product={product} labels={labels} />
      ))}
    </Box>
  );
}
