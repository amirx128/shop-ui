import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export interface ProductOrderCartProduct {
  id: string;
  title: string;
  color: {
    name: string;
    hex: string;
  };
  quantity: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
}

export interface ProductOrderCartLabels {
  color: string;
  quantity: string;
  price: string;
}

interface ProductOrderCartProps {
  product: ProductOrderCartProduct;
  labels: ProductOrderCartLabels;
}

export default function ProductOrderCart({
  product,
  labels,
}: ProductOrderCartProps) {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: '8px',
        p: '3px',
        backgroundColor: 'background.paper',
        display: 'flex',
        gap: 1,
      }}
    >
      <Box sx={{ flex: '0 0 auto' }}>
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          width={118}
          height={118}
          sizes="118px"
          style={{ borderRadius: 16, objectFit: 'cover' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          minWidth: 0,
          flex: 1,
          py: 0.5,
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            color: 'text.primary',
            lineHeight: 1.6,
          }}
        >
          {product.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
            {labels.color}:
          </Typography>
          <Box
            sx={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: product.color.hex,
              border: '1px solid',
              borderColor: 'divider',
            }}
          />
        </Box>

        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
          {labels.quantity}: {product.quantity}
        </Typography>

        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
          {labels.price}: {product.price}
        </Typography>
      </Box>
    </Box>
  );
}
