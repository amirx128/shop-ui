'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type {
  AddressFormValidationMessages,
  AddressFormValues,
} from '../types/addresses';

const toEnglishDigits = (value: string) =>
  value
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));

const digitsOnly = (value: string) => toEnglishDigits(value).replace(/\D/g, '');

const createAddAddressSchema = (messages: AddressFormValidationMessages) =>
  z.object({
    receiverName: z.string().min(1, messages.required),
    phone: z
      .string()
      .min(1, messages.required)
      .refine((value) => digitsOnly(value).length === 11, messages.phone),
    email: z.union([z.string().trim().email(messages.email), z.literal('')]),
    province: z.string().min(1, messages.required),
    city: z.string().min(1, messages.required),
    postalCode: z
      .string()
      .min(1, messages.required)
      .refine((value) => digitsOnly(value).length === 10, messages.postalCode),
    address: z.string().min(1, messages.required),
  });

interface UseAddAddressFormOptions {
  defaultValues: AddressFormValues;
  validationMessages: AddressFormValidationMessages;
}

export default function useAddAddressForm({
  defaultValues,
  validationMessages,
}: UseAddAddressFormOptions) {
  const schema = createAddAddressSchema(validationMessages);

  return useForm<AddressFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur',
  });
}
