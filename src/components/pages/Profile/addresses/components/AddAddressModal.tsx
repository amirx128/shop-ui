'use client';

import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Box, Container, Modal } from '@mui/material';
import Button from '@/components/ui/Button';
import TextAreaInput from '@/components/ui/TextAreaInput';
import TextInput from '@/components/ui/TextInput';
import { useAddAddressForm } from '../hooks';
import AddressesHeader from './AddressesHeader';
import type { AddressFormValues, AddressesTexts } from '../types/addresses';

interface AddAddressModalProps {
  open: boolean;
  mode: 'create' | 'edit';
  onClose: () => void;
  onSubmit: (data: AddressFormValues) => void;
  initialValues: AddressFormValues;
  formId: string;
  texts: AddressesTexts;
}

export default function AddAddressModal({
  open,
  mode,
  onClose,
  onSubmit,
  initialValues,
  formId,
  texts,
}: AddAddressModalProps) {
  const { register, control, handleSubmit, reset, formState } = useAddAddressForm({
    defaultValues: initialValues,
    validationMessages: texts.validation,
  });

  const { errors } = formState;

  useEffect(() => {
    if (open) {
      reset(initialValues);
    }
  }, [open, initialValues, reset]);

  const handleClose = () => {
    reset(initialValues);
    onClose();
  };

  const submitForm = (data: AddressFormValues) => {
    onSubmit(data);
    handleClose();
  };

  const submitLabel = mode === 'edit' ? texts.actions.edit : texts.actions.add;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
      }}
    >
      <Box
        onClick={(event) => {
          event.stopPropagation();
        }}
        sx={{
          width: '100%',
          height: '100dvh',
          backgroundColor: 'background.default',
        }}
      >
        <Box
          component="form"
          id={formId}
          onSubmit={handleSubmit(submitForm)}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Box sx={{ py: 2, flexShrink: 0 }}>
            <Container>
              <AddressesHeader title={texts.title} onBackClick={handleClose} />
            </Container>
          </Box>

          <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
            <Container sx={{ py: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextInput
                  label={texts.fields.receiverName}
                  placeholder={texts.fields.receiverName}
                  autoComplete="name"
                  error={Boolean(errors.receiverName)}
                  helperText={errors.receiverName?.message}
                  fullWidth
                  {...register('receiverName')}
                />

                <TextInput
                  label={texts.fields.phone}
                  placeholder={texts.fields.phone}
                  autoComplete="tel"
                  inputMode="numeric"
                  error={Boolean(errors.phone)}
                  helperText={errors.phone?.message}
                  fullWidth
                  {...register('phone')}
                />

                <TextInput
                  label={texts.fields.email}
                  placeholder={texts.fields.email}
                  type="email"
                  autoComplete="email"
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  fullWidth
                  {...register('email')}
                />

                <TextInput
                  label={texts.fields.province}
                  placeholder={texts.fields.province}
                  autoComplete="address-level1"
                  error={Boolean(errors.province)}
                  helperText={errors.province?.message}
                  fullWidth
                  {...register('province')}
                />

                <TextInput
                  label={texts.fields.city}
                  placeholder={texts.fields.city}
                  autoComplete="address-level2"
                  error={Boolean(errors.city)}
                  helperText={errors.city?.message}
                  fullWidth
                  {...register('city')}
                />

                <TextInput
                  label={texts.fields.postalCode}
                  placeholder={texts.fields.postalCode}
                  autoComplete="postal-code"
                  inputMode="numeric"
                  error={Boolean(errors.postalCode)}
                  helperText={errors.postalCode?.message}
                  fullWidth
                  {...register('postalCode')}
                />

                <Controller
                  control={control}
                  name="address"
                  render={({ field }) => (
                    <TextAreaInput
                      value={field.value}
                      onChange={field.onChange}
                      label={texts.fields.address}
                      placeholder={texts.fields.address}
                      error={Boolean(errors.address)}
                      helperText={errors.address?.message}
                    />
                  )}
                />
              </Box>
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Button type="submit" fullWidth radius="md">
                  {submitLabel}
                </Button>
                <Button
                  type="button"
                  variant="bordered"
                  fullWidth
                  radius="md"
                  onClick={handleClose}
                  sx={{
                    color: 'text.primary',
                    borderColor: 'text.primary',
                  }}
                >
                  {texts.actions.cancel}
                </Button>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
