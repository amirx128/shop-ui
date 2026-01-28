'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  Container,
  Divider,
  FormControlLabel,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import CheckoutFooter from './CheckoutFooter';
import DayCard from './DayCard';
import { SummaryRow } from '../types/checkout';
import RadioInput from '@/components/ui/RadioInput';

interface CheckoutStepTwoClientProps {
  locale: string;
  currency: string;
  itemsCount: number;
  itemsPrice: number;
  savings: number;
  baseTotal: number;
  actionLabel: string;
  nextStepHref: string;
  translations: {
    methodTitle: string;
    timeTitle: string;
    postMethod: string;
    courierMethod: string;
    itemsPrice: string;
    shippingCost: string;
    cartTotal: string;
    savingsLabel: string;
    selectDeliveryWarning: string;
  };
}

interface ShippingMethodOption {
  id: 'post' | 'courier';
  label: string;
  cost: number;
}

export default function CheckoutStepTwoClient({
  locale,
  currency,
  itemsCount,
  itemsPrice,
  savings,
  baseTotal,
  actionLabel,
  nextStepHref,
  translations,
}: CheckoutStepTwoClientProps) {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<
    ShippingMethodOption['id'] | null
  >(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

  const shippingMethods: ShippingMethodOption[] = [
    {
      id: 'post',
      label: translations.postMethod,
      cost: 0,
    },
    {
      id: 'courier',
      label: translations.courierMethod,
      cost: 120000,
    },
  ];

  const dayCards = useMemo(() => {
    const weekdayFormatter = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
    });
    const dateFormatter = new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
    });

    return Array.from({ length: 8 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      return {
        id: index,
        dayLabel: weekdayFormatter.format(date),
        dateLabel: dateFormatter.format(date),
      };
    });
  }, [locale]);

  const selectedShipping = shippingMethods.find(
    (method) => method.id === selectedMethod,
  );
  const hasSelection = selectedMethod !== null && selectedDayIndex !== null;
  const shippingCost = selectedShipping?.cost ?? 0;
  const totalWithShipping = baseTotal + (hasSelection ? shippingCost : 0);

  const formatCurrency = (value: number) =>
    `${value.toLocaleString(locale)} ${currency}`;

  const summaryRows: SummaryRow[] = [
    {
      title: `${translations.itemsPrice} (${itemsCount})`,
      value: formatCurrency(itemsPrice),
    },
    ...(hasSelection
      ? [
          {
            title: translations.shippingCost,
            value: formatCurrency(shippingCost),
          },
        ]
      : []),
    {
      title: translations.cartTotal,
      value: formatCurrency(totalWithShipping),
    },
    {
      title: translations.savingsLabel,
      value: formatCurrency(savings),
      color: 'success.main',
    },
  ];

  const handleContinue = () => {
    if (!hasSelection) {
      toast.error(translations.selectDeliveryWarning);
      return;
    }
    router.push(nextStepHref);
  };

  return (
    <>
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {translations.methodTitle}
            </Typography>
            <RadioGroup
              value={selectedMethod ?? ''}
              onChange={(event) =>
                setSelectedMethod(event.target.value as ShippingMethodOption['id'])
              }
              sx={{ gap: 1 }}
            >
              {shippingMethods.map((method) => (
                <FormControlLabel
                  key={method.id}
                  value={method.id}
                  control={<RadioInput />}
                  label={method.label}
                />
              ))}
            </RadioGroup>
          </Box>

          <Divider />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {translations.timeTitle}
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 80px)',
                gap: 2,
                justifyContent: 'space-between',
              }}
            >
              {dayCards.map((day) => (
                <DayCard
                  key={day.id}
                  dayLabel={day.dayLabel}
                  dateLabel={day.dateLabel}
                  selected={selectedDayIndex === day.id}
                  onSelect={() => setSelectedDayIndex(day.id)}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>

      <CheckoutFooter
        totalLabel={translations.cartTotal}
        totalValue={formatCurrency(totalWithShipping)}
        actionLabel={actionLabel}
        onAction={handleContinue}
        summaryRows={summaryRows}
      />
    </>
  );
}
