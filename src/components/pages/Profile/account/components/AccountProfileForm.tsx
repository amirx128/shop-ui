'use client';

import { Box } from '@mui/material';
import TextInput from '@/components/ui/TextInput';
import useAccountProfileForm from '../hooks/useAccountProfileForm';
import type {
  AccountProfileFormTexts,
  AccountProfileFormValues,
} from '../types/accountProfile';

interface AccountProfileFormProps {
  formId: string;
  texts: AccountProfileFormTexts;
  defaultValues: AccountProfileFormValues;
}

export default function AccountProfileForm({
  formId,
  texts,
  defaultValues,
}: AccountProfileFormProps) {
  const { register, handleSubmit, formState } = useAccountProfileForm({
    defaultValues,
    validationMessages: texts.validation,
  });

  const { errors } = formState;

  const fields: Array<{
    name: keyof AccountProfileFormValues;
    type?: string;
    autoComplete?: string;
    multiline?: boolean;
    minRows?: number;
  }> = [
    { name: 'fullName', autoComplete: 'name' },
    { name: 'email', type: 'email', autoComplete: 'email' },
    { name: 'phone', autoComplete: 'tel' },
    { name: 'postalCode', autoComplete: 'postal-code' },
    { name: 'province', autoComplete: 'address-level1' },
    { name: 'city', autoComplete: 'address-level2' },
    {
      name: 'address',
      autoComplete: 'street-address',
      multiline: true,
      minRows: 4,
    },
  ];

  const onSubmit = (data: AccountProfileFormValues) => {
    void data;
  };

  return (
    <Box
      component="form"
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {fields.map((field) => (
        <TextInput
          key={field.name}
          {...register(field.name)}
          type={field.type}
          label={texts.labels[field.name]}
          error={Boolean(errors[field.name])}
          helperText={errors[field.name]?.message}
          autoComplete={field.autoComplete}
          multiline={field.multiline}
          minRows={field.minRows}
          fullWidth
        />
      ))}
    </Box>
  );
}
