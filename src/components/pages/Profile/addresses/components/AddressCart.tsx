'use client';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Button from '@/components/ui/Button';
import type { AddressItem } from '../types/addresses';

interface AddressCartProps {
  address: AddressItem;
  selectedAddressLabel: string;
  receiverLabel: string;
  editAddressLabel: string;
  onEdit: () => void;
}

export default function AddressCart({
  address,
  selectedAddressLabel,
  receiverLabel,
  editAddressLabel,
  onEdit,
}: AddressCartProps) {
  return (
    <Box
      sx={(theme) => ({
        border: '1px solid',
        borderColor: address.isDefault ? 'secondary.main' : 'divider',
        borderRadius: '12px',
        p: 2,
        backgroundColor: address.isDefault
          ? alpha(theme.palette.secondary.main, 0.05)
          : 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      })}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'text.primary' }}>
          {address.isDefault ? selectedAddressLabel : ''}
        </Typography>
        <Button
          type="button"
          variant="outline"
          radius="md"
          onClick={onEdit}
          sx={{
            px: 0,
            py: 0,
            minWidth: 'auto',
            minHeight: 'auto',
            color: 'secondary.main',
            fontSize: 13,
          }}
        >
          {editAddressLabel}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75 }}>
        <LocationOnOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary', mt: '2px' }} />
        <Typography sx={{ fontSize: 14, lineHeight: 1.9, color: 'text.primary' }}>
          {address.address}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <AccountCircleOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Typography sx={{ fontSize: 13, color: 'text.primary' }}>
            {`${receiverLabel} ${address.receiverName}`}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LocalPhoneOutlinedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Typography sx={{ fontSize: 13, color: 'text.primary' }}>{address.phone}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
