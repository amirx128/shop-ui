'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type {
  ContactusFormValues,
  ContactusValidationMessages,
  ContactusFoundUsValue,
} from '../types';

const FOUND_US_VALUES: ContactusFoundUsValue[] = [
  'instagram',
  'search',
  'friends',
  'advertisement',
  'other',
];

const toEnglishDigits = (value: string) =>
  value
    .replace(/[\u06f0-\u06f9]/g, (digit) =>
      String(digit.charCodeAt(0) - 0x06f0),
    )
    .replace(/[\u0660-\u0669]/g, (digit) =>
      String(digit.charCodeAt(0) - 0x0660),
    );

const normalizeMobile = (value: string) => {
  const digits = toEnglishDigits(value).replace(/\D/g, '');

  if (digits.startsWith('98') && digits.length === 12) {
    return `0${digits.slice(2)}`;
  }

  if (digits.startsWith('9') && digits.length === 10) {
    return `0${digits}`;
  }

  return digits;
};

const createContactusSchema = (messages: ContactusValidationMessages) =>
  z.object({
    fullName: z.string().trim().min(1, messages.required),
    mobile: z
      .string()
      .trim()
      .min(1, messages.required)
      .refine((value) => /^09\d{9}$/.test(normalizeMobile(value)), {
        message: messages.invalidMobile,
      }),
    email: z.union([z.string().trim().email(messages.invalidEmail), z.literal('')]),
    foundUs: z
      .string()
      .trim()
      .min(1, messages.required)
      .refine((value) => FOUND_US_VALUES.includes(value as ContactusFoundUsValue), {
        message: messages.required,
      }),
  });

interface UseContactusFormOptions {
  defaultValues: ContactusFormValues;
  validationMessages: ContactusValidationMessages;
}

export default function useContactusForm({
  defaultValues,
  validationMessages,
}: UseContactusFormOptions) {
  const schema = createContactusSchema(validationMessages);

  return useForm<ContactusFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });
}
