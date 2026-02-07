'use client';

import { useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Box, Container, Typography } from '@mui/material';
import Button from '@/components/ui/Button';
import AddAddressModal from './AddAddressModal';
import AddressCart from './AddressCart';
import type { AddressFormValues, AddressItem, AddressesTexts } from '../types/addresses';

interface AddressesBodyClientProps {
  texts: AddressesTexts;
  formIdPrefix: string;
  initialAddresses: AddressItem[];
}

export default function AddressesBodyClient({
  texts,
  formIdPrefix,
  initialAddresses,
}: AddressesBodyClientProps) {
  const [addresses, setAddresses] = useState<AddressItem[]>(initialAddresses);
  const [modalState, setModalState] = useState<{
    open: boolean;
    mode: 'create' | 'edit';
    editingId: string | null;
  }>({
    open: false,
    mode: 'create',
    editingId: null,
  });

  const emptyFormValues: AddressFormValues = {
    receiverName: '',
    phone: '',
    email: '',
    province: '',
    city: '',
    postalCode: '',
    address: '',
  };

  const activeAddress = modalState.editingId
    ? addresses.find((item) => item.id === modalState.editingId)
    : undefined;

  const modalInitialValues: AddressFormValues = activeAddress
    ? {
      receiverName: activeAddress.receiverName,
      phone: activeAddress.phone,
      email: activeAddress.email,
      province: activeAddress.province,
      city: activeAddress.city,
      postalCode: activeAddress.postalCode,
      address: activeAddress.address,
    }
    : emptyFormValues;

  const modalFormId = modalState.mode === 'edit' && modalState.editingId
    ? `${formIdPrefix}-edit-${modalState.editingId}`
    : `${formIdPrefix}-create`;

  const handleOpenCreateModal = () => {
    setModalState({
      open: true,
      mode: 'create',
      editingId: null,
    });
  };

  const handleOpenEditModal = (addressId: string) => {
    setModalState({
      open: true,
      mode: 'edit',
      editingId: addressId,
    });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
      editingId: null,
    }));
  };

  const handleSubmitAddress = (data: AddressFormValues) => {
    if (modalState.mode === 'edit' && modalState.editingId) {
      setAddresses((prev) =>
        prev.map((item) =>
          item.id === modalState.editingId
            ? {
              ...item,
              ...data,
            }
            : item,
        ),
      );
      return;
    }

    setAddresses((prev) => [
      ...prev,
      {
        id: `address-${Date.now()}`,
        isDefault: prev.length === 0,
        ...data,
      },
    ]);
  };

  return (
    <>
      <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <Container sx={{ py: 2, height: '100%' }}>
          {addresses.length === 0 ? (
            <Box
              sx={{
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Typography sx={{ fontSize: 14, color: 'text.secondary', lineHeight: 2 }}>
                {texts.emptyState.description}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {addresses.map((address) => (
                <AddressCart
                  key={address.id}
                  address={address}
                  selectedAddressLabel={texts.labels.selectedAddress}
                  receiverLabel={texts.labels.receiver}
                  editAddressLabel={texts.actions.editAddress}
                  onEdit={() => handleOpenEditModal(address.id)}
                />
              ))}
            </Box>
          )}
        </Container>
      </Box>

      <Box
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          py: 2,
          backgroundColor: 'background.default',
          flexShrink: 0,
        }}
      >
        <Container>
          <Button
            variant="bordered"
            radius="md"
            fullWidth
            startIcon={<AddOutlinedIcon sx={{ fontSize: 18 }} />}
            onClick={handleOpenCreateModal}
          >
            {texts.actions.add}
          </Button>
        </Container>
      </Box>

      <AddAddressModal
        open={modalState.open}
        mode={modalState.mode}
        onClose={handleCloseModal}
        onSubmit={handleSubmitAddress}
        initialValues={modalInitialValues}
        formId={modalFormId}
        texts={texts}
      />
    </>
  );
}
