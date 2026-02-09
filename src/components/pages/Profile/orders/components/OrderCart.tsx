'use client';

import { Box, Divider, Typography } from '@mui/material';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Image from 'next/image';
import Link from 'next/link';
import type { OrdersProfileOrder } from '../types/ordersProfile';

interface OrderCartLabels {
  orderCode: string;
  payableAmount: string;
  currency: string;
  details: string;
}

interface OrderCartProps {
  order: OrdersProfileOrder;
  labels: OrderCartLabels;
  detailsHref: string;
}

export default function OrderCart({
  order,
  labels,
  detailsHref,
}: OrderCartProps) {
  const statusIcon =
    order.status === 'delivered' ? (
      <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
    ) : order.status === 'returned' ? (
      <RestartAltIcon sx={{ fontSize: 16, color: 'text.primary' }} />
    ) : order.status === 'canceled' ? (
      <CancelOutlinedIcon sx={{ fontSize: 16, color: 'error.main' }} />
    ) : (
      <Box
        sx={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          border: '2px dashed',
          borderColor: 'divider',
        }}
      />
    );

  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        p: 1.5,
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.secondary',
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            {order.date}
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            {labels.orderCode} : {order.code}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          {statusIcon}
          <Typography
            sx={{ fontSize: 14, fontWeight: 500, color: 'text.primary' }}
          >
            {order.statusLabel}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {order.items.map((item) => (
          <Box key={item.id} sx={{ flex: '0 0 auto' }}>
            <Image
              src={item.src}
              alt={item.alt}
              width={59}
              height={46}
              sizes="59px"
              style={{ borderRadius: 4, objectFit: 'cover' }}
            />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
            {labels.payableAmount} :
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: 600, color: 'text.primary' }}
          >
            {order.amount} {labels.currency}
          </Typography>
        </Box>
        <Box
          component={Link}
          href={detailsHref}
          aria-label={labels.details}
          target="_blank"
          rel="noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
            textDecoration: 'none',
          }}
        >
          <ChevronLeftOutlinedIcon />
        </Box>
      </Box>
    </Box>
  );
}
