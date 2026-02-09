'use client';

import { useEffect } from 'react';
import {
  Box,
  Container,
  MenuItem,
  Modal,
  TextField,
  Typography,
  IconButton,
  Button as MuiButton,
} from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Controller, useForm } from 'react-hook-form';
import TextInput from '@/components/ui/TextInput';
import TextAreaInput from '@/components/ui/TextAreaInput';
import Button from '@/components/ui/Button';
import { AddressFormValues } from '../types/checkout';
import type { LocationOption } from '@/services/location.service';

interface AddressFormModalProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialValues: AddressFormValues;
  onClose: () => void;
  onSubmit: (data: AddressFormValues) => void;
  translations: {
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
    street: string;
    addressLine: string;
    required: string;
  };
  provinces: LocationOption[];
  cities: LocationOption[];
  isCityLoading: boolean;
  onProvinceChange: (provinceId: number) => Promise<LocationOption[]>;
  isSubmitting: boolean;
  formId: string;
}

export default function AddressFormModal({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
  translations,
  provinces,
  cities,
  isCityLoading,
  onProvinceChange,
  isSubmitting,
  formId,
}: AddressFormModalProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddressFormValues>({
    defaultValues: initialValues,
    mode: 'onChange',
  });

  const selectedProvinceId = watch('provinceId');

  useEffect(() => {
    if (open) {
      reset(initialValues);
    }
  }, [open, initialValues, reset]);

  useEffect(() => {
    if (!selectedProvinceId) {
      setValue('cityId', 0);
      return;
    }

    onProvinceChange(selectedProvinceId).then((loaded) => {
      if (mode === 'create' && loaded.length > 0) {
        setValue('cityId', loaded[0].id);
        return;
      }

      if (mode === 'edit' && initialValues.cityId) {
        setValue('cityId', initialValues.cityId);
      }
    });
  }, [
    mode,
    onProvinceChange,
    selectedProvinceId,
    setValue,
    initialValues.cityId,
  ]);

  const title =
    mode === 'create'
      ? translations.addAddressTitle
      : translations.editAddressTitle;
  const submitLabel =
    mode === 'create' ? translations.submitAdd : translations.submitEdit;

  const handleClose = () => {
    reset(initialValues);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <Box
        component="form"
        id={formId}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: '100%',
          maxHeight: '85vh',
          backgroundColor: 'background.default',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            py: 2,
          }}
        >
          <Container>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
              <IconButton
                onClick={handleClose}
                size="small"
                sx={{ color: 'text.primary' }}
              >
                <HighlightOffOutlinedIcon />
              </IconButton>
            </Box>
          </Container>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            py: 2,
          }}
        >
          <Container>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextInput
                label={translations.receiverName}
                placeholder={translations.receiverName}
                fullWidth
                error={!!errors.receiverName}
                helperText={errors.receiverName?.message}
                {...register('receiverName', {
                  required: translations.required,
                })}
              />

              <TextInput
                label={translations.phone}
                placeholder={translations.phone}
                type="tel"
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message}
                {...register('phone', {
                  required: translations.required,
                })}
              />

              <TextInput
                label={translations.email}
                placeholder={translations.email}
                type="email"
                fullWidth
                {...register('email')}
              />

              <Controller
                name="provinceId"
                control={control}
                rules={{ required: translations.required }}
                render={({ field }) => (
                  <TextField
                    label={translations.province}
                    select
                    value={field.value ?? ''}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value) || 0)
                    }
                    error={Boolean(errors.provinceId)}
                    helperText={errors.provinceId?.message}
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>{translations.province}</em>
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
                rules={{ required: translations.required }}
                render={({ field }) => (
                  <TextField
                    label={translations.city}
                    select
                    value={field.value ?? ''}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value) || 0)
                    }
                    error={Boolean(errors.cityId)}
                    helperText={errors.cityId?.message}
                    fullWidth
                    disabled={isCityLoading || cities.length === 0}
                  >
                    <MenuItem value="">
                      <em>{translations.city}</em>
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
                label={translations.street}
                placeholder={translations.street}
                fullWidth
                error={!!errors.street}
                helperText={errors.street?.message}
                {...register('street', {
                  required: translations.required,
                })}
              />

              <Controller
                control={control}
                name="addressLine"
                rules={{ required: translations.required }}
                render={({ field }) => (
                  <TextAreaInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={translations.addressLine}
                    error={!!errors.addressLine}
                    helperText={errors.addressLine?.message}
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
          }}
        >
          <Container>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outline" fullWidth type="submit" disabled={isSubmitting}>
                {submitLabel}
              </Button>
              <MuiButton
                variant="text"
                fullWidth
                onClick={handleClose}
                sx={{
                  color: 'text.secondary',
                  textTransform: 'none',
                }}
                disabled={isSubmitting}
              >
                {translations.cancel}
              </MuiButton>
            </Box>
          </Container>
        </Box>
      </Box>
    </Modal>
  );
}
