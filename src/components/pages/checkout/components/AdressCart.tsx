'use client';

import { Box, Typography, useTheme } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { alpha } from '@mui/material/styles';
import { CheckoutAddress } from '../types/checkout';

interface AdressCartProps {
  address: CheckoutAddress;
  selected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  translations: {
    selectedAddress: string;
    editAddress: string;
    receiverLabel: string;
  };
}

export default function AdressCart({
  address,
  selected,
  onSelect,
  onEdit,
  translations,
}: AdressCartProps) {
  const theme = useTheme();
  const selectedBackground = alpha(theme.palette.secondary.main, 0.15);

  return (
    <Box
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
      sx={{
        width: '100%',
        textAlign: 'right',
        borderRadius: 2,
        border: '1px solid',
        borderColor: selected ? 'secondary.main' : 'divider',
        backgroundColor: selected ? selectedBackground : 'transparent',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        cursor: 'pointer',
      }}
    >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {translations.selectedAddress}
          </Typography>
          <Box
            role="button"
            tabIndex={0}
            onClick={(event) => {
              event.stopPropagation();
              onEdit();
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                event.stopPropagation();
                onEdit();
              }
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'secondary.main',
              borderRadius: 2,
              cursor: 'pointer',
            }}
          >
            <EditOutlinedIcon fontSize="small" />
            <Typography variant="caption" sx={{ color: 'secondary.main' }}>
              {translations.editAddress}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocationOnOutlinedIcon fontSize="small" />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {address.city}:
          </Typography>
          <Typography variant="body2">{address.addressLine}</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccountCircleOutlinedIcon fontSize="small" />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {translations.receiverLabel}:
            </Typography>
            <Typography variant="body2">{address.receiverName}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CallOutlinedIcon fontSize="small" />
            <Typography variant="body2">{address.phone}</Typography>
          </Box>
        </Box>
    </Box>
  );
}
