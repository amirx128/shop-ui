import { Box } from '@mui/material';
import ProductOrderCart, {
  ProductOrderCartLabels,
  ProductOrderCartProduct,
} from '@/components/ui/ProductOrderCart';
import DeliveredOrderReviewAction from './DeliveredOrderReviewAction';
import type { DeliveredReviewModalLabels } from '../types/orderDetail';

interface OrderDetailProductsProps {
  products: ProductOrderCartProduct[];
  labels: ProductOrderCartLabels;
  showReviewAction?: boolean;
  reviewLabels?: DeliveredReviewModalLabels;
}

export default function OrderDetailProducts({
  products,
  labels,
  showReviewAction = false,
  reviewLabels,
}: OrderDetailProductsProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {products.map((product) => (
        <Box
          key={product.id}
          sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
        >
          <ProductOrderCart product={product} labels={labels} />
          {showReviewAction && reviewLabels ? (
            <DeliveredOrderReviewAction labels={reviewLabels} />
          ) : null}
        </Box>
      ))}
    </Box>
  );
}
