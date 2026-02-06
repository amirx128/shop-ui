'use client';

import { Controller } from 'react-hook-form';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import dynamic from 'next/dynamic';
import {
  Box,
  Container,
  Divider,
  Modal,
  Typography,
} from '@mui/material';
import Button from '@/components/ui/Button';
import NumberInput from '@/components/ui/NumberInput';
import SelectInput from '@/components/ui/SelectInput';
import { toEnglishDigits } from '@/components/ui/dateUtils';
import useTransactionsFilterForm from '../hooks/useTransactionsFilterForm';
import useTransactionsFilterModal from '../hooks/useTransactionsFilterModal';
import type {
  WalletTransactionsAccountOption,
  WalletTransactionsFilterFormValues,
  WalletTransactionsFilterLabels,
  WalletTransactionsFilterTabOption,
} from '../types/transactions';

const DateInput = dynamic(() => import('@/components/ui/DateInput'), {
  ssr: false,
});

interface TransactionsFilterModalActionProps {
  locale: string;
  triggerLabel: string;
  filterLabels: WalletTransactionsFilterLabels;
  tabOptions: WalletTransactionsFilterTabOption[];
  accountOptions: WalletTransactionsAccountOption[];
}

const defaultValues: WalletTransactionsFilterFormValues = {
  tab: 'all',
  accountType: '',
  amountTo: '',
  amountFrom: '',
  dateFrom: null,
  dateTo: null,
};

const toDigitsOnly = (value: string) =>
  toEnglishDigits(value).replace(/\D/g, '');

export default function TransactionsFilterModalAction({
  locale,
  triggerLabel,
  filterLabels,
  tabOptions,
  accountOptions,
}: TransactionsFilterModalActionProps) {
  const { open, openModal, closeModal } = useTransactionsFilterModal();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useTransactionsFilterForm({
    defaultValues,
    validationMessages: filterLabels.validation,
  });

  const submitFilters = () => {
    closeModal();
  };

  const handleOpenModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    openModal();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        style={{
          border: 'none',
          background: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: 'text.primary',
          }}
        >
          <FilterAltOutlinedIcon sx={{ fontSize: 18 }} />
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'text.primary' }}>
            {triggerLabel}
          </Typography>
        </Box>
      </button>

      <Modal
        open={open}
        onClose={(_, reason) => {
          if (reason === 'backdropClick') {
            return;
          }
          closeModal();
        }}
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'center',
        }}
      >
        <Box
          onClick={(event) => {
            event.stopPropagation();
          }}
          sx={{
            width: '100%',
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.default',
          }}
        >
          <Box sx={{ py: 2 }}>
            <Container>
              <Box
                component="button"
                type="button"
                onClick={closeModal}
                sx={{
                  border: 'none',
                  background: 'none',
                  p: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'text.primary',
                  font: 'inherit',
                  cursor: 'pointer',
                }}
              >
                <ArrowForwardOutlinedIcon />
                <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'text.primary' }}>
                  {filterLabels.title}
                </Typography>
              </Box>
            </Container>
          </Box>

          <Divider />

          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            <Container sx={{ py: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Controller
                  control={control}
                  name="tab"
                  render={({ field }) => (
                    <Box
                      sx={{
                        width: '100%',
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: '8px',
                        px: '8px',
                        py: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 0.5,
                      }}
                    >
                      {tabOptions.map((tab) => {
                        const isActive = field.value === tab.value;

                        return (
                          <Box
                            key={tab.value}
                            component="button"
                            type="button"
                            onClick={() => field.onChange(tab.value)}
                            sx={{
                              border: 'none',
                              background: 'none',
                              p: 0,
                              font: 'inherit',
                              cursor: 'pointer',
                              color: isActive ? 'common.white' : 'text.primary',
                            }}
                          >
                            <Box
                              sx={
                                isActive
                                  ? {
                                      backgroundColor: 'primary.main',
                                      borderRadius: '8px',
                                      px: '8px',
                                      py: '8px',
                                    }
                                  : undefined
                              }
                            >
                              <Typography
                                sx={{
                                  fontSize: 13,
                                  fontWeight: 500,
                                  color: 'inherit',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {`${tab.label} (${tab.count})`}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  )}
                />

                <Controller
                  control={control}
                  name="accountType"
                  render={({ field }) => (
                    <SelectInput
                      fullWidth
                      value={field.value}
                      onChange={field.onChange}
                      options={accountOptions}
                      placeholder={filterLabels.accountTypePlaceholder}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1,
                          padding: '10px 8px',
                        },
                        '& .MuiOutlinedInput-input': {
                          py: 1.25,
                          fontSize: 13,
                        },
                      }}
                    />
                  )}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'text.primary' }}>
                    {filterLabels.transactionAmountTitle}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                    <Controller
                      control={control}
                      name="amountTo"
                      render={({ field }) => (
                        <NumberInput
                          value={field.value}
                          onChange={(event) => field.onChange(toDigitsOnly(event.target.value))}
                          placeholder={filterLabels.amountToPlaceholder}
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 1,
                            },
                            '& .MuiOutlinedInput-input': {
                              fontSize: 13,
                            },
                          }}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="amountFrom"
                      render={({ field }) => (
                        <NumberInput
                          value={field.value}
                          onChange={(event) => field.onChange(toDigitsOnly(event.target.value))}
                          placeholder={filterLabels.amountFromPlaceholder}
                          error={!!errors.amountFrom}
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 1,
                            },
                            '& .MuiOutlinedInput-input': {
                              fontSize: 13,
                            },
                          }}
                        />
                      )}
                    />
                  </Box>
                  {errors.amountFrom?.message ? (
                    <Typography sx={{ fontSize: 12, color: 'error.main' }}>
                      {errors.amountFrom.message}
                    </Typography>
                  ) : null}
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'text.primary' }}>
                    {filterLabels.transactionDateTitle}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                    <Controller
                      control={control}
                      name="dateFrom"
                      render={({ field }) => (
                        <DateInput
                          value={field.value}
                          onChange={field.onChange}
                          locale={locale}
                          placeholder={filterLabels.dateFromPlaceholder}
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 1,
                            },
                            '& .MuiOutlinedInput-input': {
                              py: 1.25,
                              fontSize: 13,
                            },
                          }}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="dateTo"
                      render={({ field }) => (
                        <DateInput
                          value={field.value}
                          onChange={field.onChange}
                          locale={locale}
                          placeholder={filterLabels.dateToPlaceholder}
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 1,
                            },
                            '& .MuiOutlinedInput-input': {
                              py: 1.25,
                              fontSize: 13,
                            },
                          }}
                        />
                      )}
                    />
                  </Box>
                  {errors.dateFrom?.message ? (
                    <Typography sx={{ fontSize: 12, color: 'error.main' }}>
                      {errors.dateFrom.message}
                    </Typography>
                  ) : null}
                </Box>
              </Box>
            </Container>
          </Box>

          <Box
            sx={{
              borderTop: 1,
              borderColor: 'divider',
              py: 2,
              backgroundColor: 'background.default',
            }}
          >
            <Container>
              <Button
                fullWidth
                radius="md"
                onClick={handleSubmit(submitFilters)}
                sx={{ minHeight: 44 }}
              >
                {filterLabels.apply}
              </Button>
            </Container>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
