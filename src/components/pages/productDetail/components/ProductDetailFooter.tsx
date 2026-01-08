'use client';

import { Box, Container, Typography } from '@mui/material';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import Button from '@/components/ui/Button';

interface ProductDetailFooterProps {
  price: number;
  addToCartText: string;
}

export default function ProductDetailFooter({
  price,
  addToCartText,
}: ProductDetailFooterProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR');
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
            // justifyContent: 'space-between',
            alignItems: 'center',
            gap: 4,
            py: 2,
          }}
        >
          <Button startIcon={<ShoppingBasketOutlinedIcon />}>
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
