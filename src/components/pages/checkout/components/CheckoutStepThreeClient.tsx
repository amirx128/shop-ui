'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Divider,
  FormControlLabel,
  RadioGroup,
  Typography,
} from '@mui/material';
import CheckoutFooter from './CheckoutFooter';
import RadioInput from '@/components/ui/RadioInput';
import BankCard from './BankCard';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import { SummaryRow } from '../types/checkout';

interface CheckoutStepThreeClientProps {
  summaryRows: SummaryRow[];
  totalLabel: string;
  totalValue: string;
  actionLabel: string;
  translations: {
    paymentGateway: string;
    wallet: string;
    walletBalance: string;
    discountTitle: string;
    discountPlaceholder: string;
    applyCode: string;
    bankMelli: string;
    bankMellat: string;
  };
}

type PaymentMethod = 'gateway' | 'wallet';

type BankOption = 'meli' | 'mellat';

export default function CheckoutStepThreeClient({
  summaryRows,
  totalLabel,
  totalValue,
  actionLabel,
  translations,
}: CheckoutStepThreeClientProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('gateway');
  const [selectedBank, setSelectedBank] = useState<BankOption>('meli');
  const [discountCode, setDiscountCode] = useState('');

  return (
    <>
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <RadioGroup
              value={paymentMethod}
              onChange={(event) =>
                setPaymentMethod(event.target.value as PaymentMethod)
              }
              sx={{ gap: 1 }}
            >
              <Box>
                <FormControlLabel
                  value="gateway"
                  control={<RadioInput />}
                  label={translations.paymentGateway}
                  sx={{ mx: 0 }}
                />
                {paymentMethod === 'gateway' && (
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                      gap: 2,
                    }}
                  >
                    <BankCard
                      name={translations.bankMelli}
                      logoSrc="/images/banks/meli.png"
                      selected={selectedBank === 'meli'}
                      onSelect={() => setSelectedBank('meli')}
                    />
                    <BankCard
                      name={translations.bankMellat}
                      logoSrc="/images/banks/mellat.png"
                      selected={selectedBank === 'mellat'}
                      onSelect={() => setSelectedBank('mellat')}
                    />
                  </Box>
                )}
              </Box>

              <Box>
                <FormControlLabel
                  value="wallet"
                  control={<RadioInput />}
                  label={translations.wallet}
                  sx={{ mx: 0 }}
                />
                {paymentMethod === 'wallet' && (
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', mt: 1 }}
                  >
                    {translations.walletBalance}
                  </Typography>
                )}
              </Box>
            </RadioGroup>
          </Box>

          <Divider />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {translations.discountTitle}
            </Typography>
            <TextInput
              placeholder={translations.discountPlaceholder}
              fullWidth
              value={discountCode}
              onChange={(event) => setDiscountCode(event.target.value)}
            />
            <Button
              variant="solid"
              fullWidth
              disabled={discountCode.trim().length === 0}
            >
              {translations.applyCode}
            </Button>
          </Box>
        </Box>
      </Container>

      <CheckoutFooter
        totalLabel={totalLabel}
        totalValue={totalValue}
        actionLabel={actionLabel}
        onAction={() => {}}
        summaryRows={summaryRows}
      />
    </>
  );
}
