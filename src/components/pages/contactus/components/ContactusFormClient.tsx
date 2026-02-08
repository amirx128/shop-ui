'use client';

import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Box, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import Button from '@/components/ui/Button';
import SelectInput from '@/components/ui/SelectInput';
import TextInput from '@/components/ui/TextInput';
import useContactusForm from '../hooks/useContactusForm';
import type { ContactusFormValues, ContactusTexts } from '../types';
import ContactusMap from './ContactusMap';

interface ContactusFormClientProps {
  formTexts: ContactusTexts['form'];
  mapTexts: ContactusTexts['map'];
  contactTexts: ContactusTexts['contact'];
}

export default function ContactusFormClient({
  formTexts,
  mapTexts,
  contactTexts,
}: ContactusFormClientProps) {
  const defaultValues: ContactusFormValues = {
    fullName: '',
    mobile: '',
    email: '',
    foundUs: '',
  };

  const { register, control, handleSubmit, formState } = useContactusForm({
    defaultValues,
    validationMessages: formTexts.validation,
  });

  const { errors, isValid, isSubmitting } = formState;

  const onSubmit = (data: ContactusFormValues) => {
    void data;
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          pb: 2,
        }}
      >
        <TextInput
          {...register('fullName')}
          label={formTexts.fields.fullName}
          error={Boolean(errors.fullName)}
          helperText={errors.fullName?.message}
          autoComplete="name"
          fullWidth
        />

        <TextInput
          {...register('mobile')}
          label={formTexts.fields.mobile}
          error={Boolean(errors.mobile)}
          helperText={errors.mobile?.message}
          autoComplete="tel"
          inputMode="tel"
          fullWidth
        />

        <TextInput
          {...register('email')}
          label={formTexts.fields.email}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          autoComplete="email"
          type="email"
          fullWidth
        />

        <Controller
          name="foundUs"
          control={control}
          render={({ field }) => (
            <SelectInput
              label={formTexts.fields.foundUs}
              value={field.value}
              onChange={field.onChange}
              options={formTexts.options}
              placeholder={formTexts.foundUsPlaceholder}
              error={Boolean(errors.foundUs)}
              helperText={errors.foundUs?.message}
              fullWidth
            />
          )}
        />

        <ContactusMap
          popupLabel={mapTexts.popup}
          loadingLabel={mapTexts.loading}
          loadingAlt={mapTexts.loadingAlt}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
            <Typography sx={{ fontSize: 14, color: 'text.primary' }}>
              {`${contactTexts.emailLabel}: ${contactTexts.emailValue}`}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CallOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
            <Typography sx={{ fontSize: 14, color: 'text.primary' }}>
              {`${contactTexts.phoneLabel}: ${contactTexts.phoneValue}`}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'sticky',
          bottom: 0,
          mt: 'auto',
          py: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.default',
          zIndex: 1,
        }}
      >
        <Button
          type="submit"
          fullWidth
          radius="md"
          disabled={!isValid || isSubmitting}
        >
          {formTexts.submit}
        </Button>
      </Box>
    </Box>
  );
}
