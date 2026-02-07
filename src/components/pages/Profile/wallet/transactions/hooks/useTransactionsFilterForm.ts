'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toEnglishDigits } from '@/components/ui/dateUtils';
import type {
  WalletTransactionsFilterFormValues,
  WalletTransactionsFilterValidationMessages,
} from '../types/transactions';

const parseAmount = (value: string) => {
  const digitsOnly = toEnglishDigits(value).replace(/\D/g, '');
  if (!digitsOnly) {
    return null;
  }

  const numberValue = Number(digitsOnly);
  return Number.isFinite(numberValue) ? numberValue : null;
};

const createTransactionsFilterSchema = (
  validationMessages: WalletTransactionsFilterValidationMessages,
) =>
  z
    .object({
      tab: z.enum(['all', 'deposit', 'withdraw']),
      accountType: z.string(),
      amountTo: z.string(),
      amountFrom: z.string(),
      dateFrom: z.date().nullable(),
      dateTo: z.date().nullable(),
    })
    .refine(
      (values) => {
        const amountFrom = parseAmount(values.amountFrom);
        const amountTo = parseAmount(values.amountTo);

        if (amountFrom === null || amountTo === null) {
          return true;
        }

        return amountFrom <= amountTo;
      },
      {
        path: ['amountFrom'],
        message: validationMessages.amountRange,
      },
    )
    .refine(
      (values) => {
        const dateFrom = values.dateFrom;
        const dateTo = values.dateTo;

        if (dateFrom === null || dateTo === null) {
          return true;
        }

        return dateFrom.getTime() <= dateTo.getTime();
      },
      {
        path: ['dateFrom'],
        message: validationMessages.dateRange,
      },
    );

interface UseTransactionsFilterFormOptions {
  defaultValues: WalletTransactionsFilterFormValues;
  validationMessages: WalletTransactionsFilterValidationMessages;
}

export default function useTransactionsFilterForm({
  defaultValues,
  validationMessages,
}: UseTransactionsFilterFormOptions) {
  const schema = createTransactionsFilterSchema(validationMessages);

  return useForm<WalletTransactionsFilterFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });
}
