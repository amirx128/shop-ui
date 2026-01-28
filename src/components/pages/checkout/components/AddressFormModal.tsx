'use client';

import { useEffect } from 'react';
import {
  Box,
  Container,
  Modal,
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
    postalCode: string;
    addressLine: string;
    required: string;
  };
}

export default function AddressFormModal({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
  translations,
}: AddressFormModalProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormValues>({
    defaultValues: initialValues,
    mode: 'onChange',
  });

  useEffect(() => {
    if (open) {
      reset(initialValues);
    }
  }, [open, initialValues, reset]);

  const title =
    mode === 'create'
      ? translations.addAddressTitle
      : translations.editAddressTitle;
  const submitLabel =
    mode === 'create' ? translations.submitAdd : translations.submitEdit;

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <Box
        component="form"
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
                onClick={onClose}
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

              <TextInput
                label={translations.province}
                placeholder={translations.province}
                fullWidth
                error={!!errors.province}
                helperText={errors.province?.message}
                {...register('province', {
                  required: translations.required,
                })}
              />

              <TextInput
                label={translations.city}
                placeholder={translations.city}
                fullWidth
                error={!!errors.city}
                helperText={errors.city?.message}
                {...register('city', {
                  required: translations.required,
                })}
              />

              <TextInput
                label={translations.postalCode}
                placeholder={translations.postalCode}
                inputMode="numeric"
                fullWidth
                error={!!errors.postalCode}
                helperText={errors.postalCode?.message}
                {...register('postalCode', {
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
              <Button variant="outline" fullWidth type="submit">
                {submitLabel}
              </Button>
              <MuiButton
                variant="text"
                fullWidth
                onClick={onClose}
                sx={{
                  color: 'text.secondary',
                  textTransform: 'none',
                }}
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
