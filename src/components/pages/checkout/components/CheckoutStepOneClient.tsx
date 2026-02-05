'use client';

import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import AdressCart from './AdressCart';
import CheckoutFooter from './CheckoutFooter';
import AddressFormModal from './AddressFormModal';
import useAddressSelection from '../hooks/useAddressSelection';
import {
  AddressFormValues,
  CheckoutAddress,
  SummaryRow,
} from '../types/checkout';
import Button from '@/components/ui/Button';

interface CheckoutStepOneClientProps {
  summaryRows: SummaryRow[];
  totalLabel: string;
  totalValue: string;
  actionLabel: string;
  nextStepHref: string;
  initialAddresses: CheckoutAddress[];
  translations: {
    emptyAddressMessage: string;
    emptyAddressAction: string;
    emptyAddressAlt: string;
    selectedAddress: string;
    editAddress: string;
    receiverLabel: string;
    addAddressTitle: string;
    editAddressTitle: string;
    submitAdd: string;
    submitEdit: string;
    cancel: string;
    receiverName: string;
    phone: string;
    email: string;
    province: string;
    city: string;
    postalCode: string;
    addressLine: string;
    required: string;
    selectAddressWarning: string;
  };
}

const emptyFormValues: AddressFormValues = {
  receiverName: '',
  phone: '',
  email: '',
  province: '',
  city: '',
  postalCode: '',
  addressLine: '',
};

export default function CheckoutStepOneClient({
  summaryRows,
  totalLabel,
  totalValue,
  actionLabel,
  nextStepHref,
  initialAddresses,
  translations,
}: CheckoutStepOneClientProps) {
  const router = useRouter();
  const [addresses, setAddresses] =
    useState<CheckoutAddress[]>(initialAddresses);
  const { selectedId, setSelectedId, hasSelection } = useAddressSelection();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingAddress = editingId
    ? addresses.find((address) => address.id === editingId) || null
    : null;

  const modalInitialValues = editingAddress
    ? {
        receiverName: editingAddress.receiverName,
        phone: editingAddress.phone,
        email: editingAddress.email ?? '',
        province: editingAddress.province,
        city: editingAddress.city,
        postalCode: editingAddress.postalCode,
        addressLine: editingAddress.addressLine,
      }
    : emptyFormValues;

  const handleOpenCreate = () => {
    setModalMode('create');
    setEditingId(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (id: string) => {
    setModalMode('edit');
    setEditingId(id);
    setModalOpen(true);
  };

  const handleSubmitAddress = (data: AddressFormValues) => {
    if (modalMode === 'create') {
      const newAddress: CheckoutAddress = {
        id: `addr-${Date.now()}`,
        receiverName: data.receiverName,
        phone: data.phone,
        email: data.email,
        province: data.province,
        city: data.city,
        postalCode: data.postalCode,
        addressLine: data.addressLine,
      };
      setAddresses((prev) => [newAddress, ...prev]);
      setSelectedId(newAddress.id);
    } else if (editingId) {
      setAddresses((prev) =>
        prev.map((address) =>
          address.id === editingId
            ? {
                ...address,
                receiverName: data.receiverName,
                phone: data.phone,
                email: data.email,
                province: data.province,
                city: data.city,
                postalCode: data.postalCode,
                addressLine: data.addressLine,
              }
            : address,
        ),
      );
    }

    setModalOpen(false);
  };

  const handleContinue = () => {
    if (!hasSelection) {
      toast.error(translations.selectAddressWarning);
      return;
    }
    router.push(nextStepHref);
  };

  return (
    <>
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {addresses.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                py: 6,
              }}
            >
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                {translations.emptyAddressMessage}
              </Typography>
              <Button
                variant="bordered"
                onClick={handleOpenCreate}
                radius="full"
              >
                {translations.emptyAddressAction}
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {addresses.map((address) => (
                <AdressCart
                  key={address.id}
                  address={address}
                  selected={selectedId === address.id}
                  onSelect={() => setSelectedId(address.id)}
                  onEdit={() => handleOpenEdit(address.id)}
                  translations={{
                    selectedAddress: translations.selectedAddress,
                    editAddress: translations.editAddress,
                    receiverLabel: translations.receiverLabel,
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Container>

      <CheckoutFooter
        totalLabel={totalLabel}
        totalValue={totalValue}
        actionLabel={actionLabel}
        onAction={handleContinue}
        summaryRows={summaryRows}
      />

      <AddressFormModal
        open={modalOpen}
        mode={modalMode}
        initialValues={modalInitialValues}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitAddress}
        translations={{
          addAddressTitle: translations.addAddressTitle,
          editAddressTitle: translations.editAddressTitle,
          submitAdd: translations.submitAdd,
          submitEdit: translations.submitEdit,
          cancel: translations.cancel,
          receiverName: translations.receiverName,
          phone: translations.phone,
          email: translations.email,
          province: translations.province,
          city: translations.city,
          postalCode: translations.postalCode,
          addressLine: translations.addressLine,
          required: translations.required,
        }}
      />
    </>
  );
}
