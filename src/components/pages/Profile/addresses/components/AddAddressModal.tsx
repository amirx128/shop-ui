'use client';

import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Box, Container, MenuItem, Modal, TextField } from '@mui/material';
import Button from '@/components/ui/Button';
import TextAreaInput from '@/components/ui/TextAreaInput';
import TextInput from '@/components/ui/TextInput';
import { useAddAddressForm } from '../hooks';
import AddressesHeader from './AddressesHeader';
import type { AddressFormValues, AddressesTexts } from '../types/addresses';
import type { LocationOption } from '@/services/location.service';

interface AddAddressModalProps {
  open: boolean;
  mode: 'create' | 'edit';
  onClose: () => void;
  onSubmit: (data: AddressFormValues) => void;
  initialValues: AddressFormValues;
  formId: string;
  texts: AddressesTexts;
  provinces: LocationOption[];
  cities: LocationOption[];
  isCityLoading: boolean;
  onProvinceChange: (provinceId: number) => Promise<LocationOption[]>;
  isSubmitting: boolean;
}

export default function AddAddressModal({
  open,
  mode,
  onClose,
  onSubmit,
  initialValues,
  formId,
  texts,
  provinces,
  cities,
  isCityLoading,
  onProvinceChange,
  isSubmitting,
}: AddAddressModalProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState,
  } = useAddAddressForm({
    defaultValues: initialValues,
    validationMessages: { required: texts.validation.required },
  });

  const { errors } = formState;
  const selectedProvinceId = watch('provinceId');

  useEffect(() => {
    if (!open) {
      return;
    }
    reset(initialValues);
  }, [initialValues, open, reset]);

  useEffect(() => {
    if (!selectedProvinceId) {
      return;
    }

    onProvinceChange(selectedProvinceId).then(() => {
      if (mode === 'create') {
        setValue('cityId', 0);
      }
    });
  }, [mode, onProvinceChange, selectedProvinceId, setValue]);

  useEffect(() => {
    if (mode === 'create' && cities.length > 0) {
      setValue('cityId', cities[0].id);
    }
  }, [cities, mode, setValue]);

  const handleClose = () => {
    reset(initialValues);
    onClose();
  };

  const submitForm = (data: AddressFormValues) => {
    onSubmit(data);
  };

  const submitLabel = mode === 'edit' ? texts.actions.editAddress : texts.actions.add;

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
                  label={texts.fields.title}
                  placeholder={texts.fields.title}
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                  fullWidth
                  {...register('title')}
                />

                <Controller
                  name="provinceId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label={texts.fields.province}
                      select
                      value={field.value ?? ''}
                      onChange={(event) => field.onChange(Number(event.target.value))}
                      error={Boolean(errors.provinceId)}
                      helperText={errors.provinceId?.message}
                      fullWidth
                    >
                      <MenuItem value="">
                        <em>{texts.fields.province}</em>
                      </MenuItem>
                      {provinces.map((province) => (
                        <MenuItem key={province.id} value={province.id}>
                          {province.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <Controller
                  name="cityId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label={texts.fields.city}
                      select
                      value={field.value ?? ''}
                      onChange={(event) => field.onChange(Number(event.target.value))}
                      error={Boolean(errors.cityId)}
                      helperText={errors.cityId?.message}
                      fullWidth
                      disabled={isCityLoading || cities.length === 0}
                    >
                      <MenuItem value="">
                        <em>{texts.fields.city}</em>
                      </MenuItem>
                      {cities.map((city) => (
                        <MenuItem key={city.id} value={city.id}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <TextInput
                  label={texts.fields.street}
                  placeholder={texts.fields.street}
                  error={Boolean(errors.street)}
                  helperText={errors.street?.message}
                  fullWidth
                  {...register('street')}
                />

                <Controller
                  name="address"
                  control={control}
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

                <TextInput
                  label={texts.fields.alley}
                  placeholder={texts.fields.alley}
                  fullWidth
                  {...register('alley')}
                />

                <TextInput
                  label={texts.fields.plaque}
                  placeholder={texts.fields.plaque}
                  fullWidth
                  {...register('plaque')}
                />

                <TextInput
                  label={texts.fields.unit}
                  placeholder={texts.fields.unit}
                  fullWidth
                  {...register('unit')}
                />

                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <TextAreaInput
                      value={field.value}
                      onChange={field.onChange}
                      label={texts.fields.location}
                      placeholder={texts.fields.location}
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
                <Button type="submit" fullWidth radius="md" disabled={isSubmitting}>
                  {submitLabel}
                </Button>
                <Button
                  type="button"
                  variant="bordered"
                  fullWidth
                  radius="md"
                  onClick={handleClose}
                  disabled={isSubmitting}
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
