'use client';

import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useQuantity from '../hooks/useQuantity';

interface QuantityStepperProps {
  initialQuantity: number;
  labels: {
    increase: string;
    decrease: string;
    remove: string;
  };
  onRemove?: () => void;
}

export default function QuantityStepper({
  initialQuantity,
  labels,
  onRemove,
}: QuantityStepperProps) {
  const { quantity, increase, decrease } = useQuantity({
    initialQuantity,
    min: 1,
  });

  const isMin = quantity <= 1;
  const handleDecrease = () => {
    if (isMin) {
      onRemove?.();
      return;
    }

    decrease();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        border: '1px solid',
        borderColor: 'secondary.main',
        borderRadius: '999px',
        p: '8px',
        justifyContent: 'space-between',
      }}
    >
      <IconButton
        size="small"
        onClick={increase}
        sx={{ color: 'secondary.main' }}
        aria-label={labels.increase}
      >
        <AddIcon fontSize="small" />
      </IconButton>
      <Typography
        variant="body2"
        sx={{ color: 'secondary.main', fontWeight: 600 }}
      >
        {quantity}
      </Typography>
      <IconButton
        size="small"
        onClick={handleDecrease}
        sx={{ color: 'secondary.main' }}
        aria-label={isMin ? labels.remove : labels.decrease}
      >
        {isMin ? (
          <DeleteOutlineIcon fontSize="small" />
        ) : (
          <RemoveIcon fontSize="small" />
        )}
      </IconButton>
    </Box>
  );
}
