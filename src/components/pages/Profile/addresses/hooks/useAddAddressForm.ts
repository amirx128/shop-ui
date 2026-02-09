'use client';

import { useForm, type UseFormReturn, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type {
  AddressFormValues,
  AddressFormValidationMessages,
} from '../types/addresses';

const createAddAddressSchema = (messages: AddressFormValidationMessages) =>
  z.object({
    title: z.string().min(1, messages.required),
    provinceId: z.coerce
      .number()
      .int(messages.required)
      .positive(messages.required),
    cityId: z.coerce
      .number()
      .int(messages.required)
      .positive(messages.required),
    street: z.string().min(1, messages.required),
    address: z.string().min(1, messages.required),
    alley: z.string(),
    plaque: z.string(),
    unit: z.string(),
    location: z.string(),
  });

interface UseAddAddressFormOptions {
  defaultValues: AddressFormValues;
  validationMessages: AddressFormValidationMessages;
}

export default function useAddAddressForm({
  defaultValues,
  validationMessages,
}: UseAddAddressFormOptions): UseFormReturn<AddressFormValues, any, AddressFormValues> {
  const schema = createAddAddressSchema(validationMessages);

  const resolver = zodResolver(schema) as Resolver<
    AddressFormValues,
    any,
    AddressFormValues
  >;

  return useForm<AddressFormValues, any, AddressFormValues>({
    resolver,
    defaultValues,
    mode: 'onBlur',
  });
}
