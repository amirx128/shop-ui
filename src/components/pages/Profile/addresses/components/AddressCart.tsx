'use client';

import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Button from '@/components/ui/Button';
import type { AddressItem } from '../types/addresses';

interface AddressCartProps {
  address: AddressItem;
  selectedAddressLabel: string;
  editAddressLabel: string;
  onEdit: () => void;
  onSelect: () => void;
}

export default function AddressCart({
  address,
  selectedAddressLabel,
  editAddressLabel,
  onEdit,
  onSelect,
}: AddressCartProps) {
  const titleText = address.title || `${address.provinceName} · ${address.cityName}`;

  const locationLines = [
    address.street,
    address.address,
    `${address.provinceName}${address.cityName ? ` · ${address.cityName}` : ''}`,
  ]
    .filter(Boolean);

  return (
    <Box
      onClick={onSelect}
      role="button"
      tabIndex={0}
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
        cursor: 'pointer',
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '2px',
        },
      })}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'text.primary' }}>
          {address.isDefault ? selectedAddressLabel : ''}
        </Typography>
        <Button
          type="button"
          variant="outline"
          radius="md"
          onClick={(event) => {
            event.stopPropagation();
            onEdit();
          }}
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
      </Stack>

      <Stack spacing={0.25}>
        <Typography sx={{ fontSize: 15, fontWeight: 600, color: 'text.primary' }}>
          {titleText}
        </Typography>
        {locationLines.map((line) => (
          <Typography
            key={line}
            sx={{ fontSize: 13, color: 'text.secondary' }}
          >
            {line}
          </Typography>
        ))}
        {address.alley && (
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
            {address.alley}
          </Typography>
        )}
        {address.plaque && (
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
            {address.plaque}
          </Typography>
        )}
        {address.unit && (
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
            {address.unit}
          </Typography>
        )}
        {address.location && (
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
            {address.location}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
