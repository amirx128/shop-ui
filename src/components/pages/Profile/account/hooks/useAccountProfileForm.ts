'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type {
  AccountProfileFormValues,
  AccountProfileFormValidationMessages,
} from '../types/accountProfile';

const createAccountProfileSchema = (
  messages: AccountProfileFormValidationMessages,
) =>
  z.object({
    fullName: z.string().min(1, messages.required),
    email: z.union([
      z.string().trim().email(messages.email),
      z.literal(''),
    ]),
    phone: z.string().min(1, messages.required),
    postalCode: z.string().min(1, messages.required),
    province: z.string().min(1, messages.required),
    city: z.string().min(1, messages.required),
    address: z.string().min(1, messages.required),
  });

interface UseAccountProfileFormOptions {
  defaultValues: AccountProfileFormValues;
  validationMessages: AccountProfileFormValidationMessages;
}

export default function useAccountProfileForm({
  defaultValues,
  validationMessages,
}: UseAccountProfileFormOptions) {
  const schema = createAccountProfileSchema(validationMessages);

  return useForm<AccountProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur',
  });
}
