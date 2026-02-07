'use client';

import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined';
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import Button from '@/components/ui/Button';
import NumberInput from '@/components/ui/NumberInput';
import { useCountdown } from '../hooks';
import type { WalletWithdrawModalLabels } from '../types/wallet';

interface WalletWithdrawModalActionProps {
  labels: WalletWithdrawModalLabels;
  balance: number;
  balanceText: string;
}

interface WithdrawFormValues {
  amount: string;
  sheba: string;
}

interface OtpFormValues {
  otp: string;
}

const toEnglishDigits = (value: string) =>
  value
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));

const digitsOnly = (value: string) => toEnglishDigits(value).replace(/\D/g, '');

const isValidIranSheba = (shebaDigits: string) => {
  if (!/^(\d{18}|\d{24})$/.test(shebaDigits)) return false;
  if (shebaDigits.length === 18) return true;

  const iban = `IR${shebaDigits}`.toUpperCase();
  const rearranged = `${iban.slice(4)}${iban.slice(0, 4)}`;
  const numeric = rearranged.replace(/[A-Z]/g, (char) =>
    String(char.charCodeAt(0) - 55),
  );

  let remainder = 0;
  for (const char of numeric) {
    remainder = (remainder * 10 + Number(char)) % 97;
  }

  return remainder === 1;
};

export default function WalletWithdrawModalAction({
  labels,
  balance,
  balanceText,
}: WalletWithdrawModalActionProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form');
  const [submittingWithdraw, setSubmittingWithdraw] = useState(false);
  const [submittingOtp, setSubmittingOtp] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);

  const withdrawSchema = useMemo(
    () =>
      z.object({
        amount: z
          .string()
          .min(1, labels.amountPlaceholder)
          .refine((value) => Number(digitsOnly(value)) > 0, labels.amountPlaceholder)
          .refine(
            (value) => Number(digitsOnly(value)) <= balance,
            labels.amountPlaceholder,
          ),
        sheba: z
          .string()
          .refine((value) => isValidIranSheba(digitsOnly(value)), labels.shebaError),
      }),
    [balance, labels.amountPlaceholder, labels.shebaError],
  );

  const otpSchema = useMemo(
    () =>
      z.object({
        otp: z
          .string()
          .min(6, labels.otpPlaceholder)
          .max(6, labels.otpPlaceholder)
          .regex(/^\d{6}$/, labels.otpPlaceholder),
      }),
    [labels.otpPlaceholder],
  );

  const {
    control,
    handleSubmit: handleWithdrawSubmit,
    watch,
    reset,
    setValue,
    formState: { isValid: isWithdrawFormValid, errors: withdrawErrors },
  } = useForm<WithdrawFormValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: '',
      sheba: '',
    },
    mode: 'onChange',
  });

  const {
    control: otpControl,
    reset: resetOtp,
    formState: { isValid: isOtpValid },
    handleSubmit: handleOtpSubmit,
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
    mode: 'onChange',
  });

  const shebaValue = watch('sheba');
  const { isExpired, reset: resetCountdown, formatTime } = useCountdown(180);

  const resetModalState = () => {
    setStep('form');
    setSubmittingWithdraw(false);
    setSubmittingOtp(false);
    setResendingOtp(false);
    reset({
      amount: '',
      sheba: '',
    });
    resetOtp({
      otp: '',
    });
    resetCountdown();
  };

  const openModal = () => {
    setOpen(true);
    resetModalState();
  };

  const closeModal = () => {
    setOpen(false);
    resetModalState();
  };

  const shebaIsValid =
    shebaValue.length > 0 &&
    !withdrawErrors.sheba &&
    isValidIranSheba(digitsOnly(shebaValue));

  const handleFillAllBalance = () => {
    setValue('amount', String(balance), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const submitWithdraw = async () => {
    setSubmittingWithdraw(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSubmittingWithdraw(false);
    setStep('otp');
    resetOtp({ otp: '' });
    resetCountdown();
  };

  const submitOtp = async () => {
    setSubmittingOtp(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSubmittingOtp(false);
    setStep('success');
  };

  const handleResendOtp = async () => {
    if (resendingOtp) return;
    setResendingOtp(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setResendingOtp(false);
    resetCountdown();
  };

  return (
    <>
      <Button
        variant="bordered"
        startIcon={<SouthOutlinedIcon sx={{ fontSize: 18 }} />}
        onClick={openModal}
        sx={{
          color: 'common.white',
          borderColor: 'common.white',
          borderRadius: 1.5,
          '&:hover': {
            borderColor: 'common.white',
            backgroundColor: 'rgba(255,255,255,0.08)',
          },
        }}
      >
        {labels.trigger}
      </Button>

      <Modal
        open={open}
        onClose={closeModal}
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            backgroundColor: 'background.default',
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ py: 2 }}>
            <Container>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Typography sx={{ fontSize: 16, fontWeight: 600, color: 'text.primary' }}>
                  {step === 'otp' ? labels.otpTitle : labels.title}
                </Typography>
                <IconButton onClick={closeModal} size="small" sx={{ color: 'text.primary' }}>
                  <CancelOutlinedIcon />
                </IconButton>
              </Box>
            </Container>
          </Box>

          {step === 'success' ? (
            <>
              <Box sx={{ py: 3 }}>
                <Container>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={(theme) => ({
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        backgroundColor: alpha(theme.palette.success.main, 0.2),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      })}
                    >
                      <CheckCircleOutlineOutlinedIcon sx={{ color: 'success.main' }} />
                    </Box>
                    <Typography sx={{ fontSize: 14, color: 'text.primary' }}>
                      {labels.successDescription}
                    </Typography>
                  </Box>
                </Container>
              </Box>

              <Box sx={{ py: 2 }}>
                <Container>
                  <Button
                    variant="bordered"
                    fullWidth
                    radius="md"
                    onClick={closeModal}
                    sx={{
                      color: 'text.primary',
                      borderColor: 'text.primary',
                    }}
                  >
                    {labels.acknowledge}
                  </Button>
                </Container>
              </Box>
            </>
          ) : step === 'otp' ? (
            <Box sx={{ py: 2 }}>
              <Container>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Controller
                    control={otpControl}
                    name="otp"
                    render={({ field, fieldState }) => (
                      <NumberInput
                        value={field.value}
                        onChange={(event) =>
                          field.onChange(digitsOnly(event.target.value).slice(0, 6))
                        }
                        label={labels.otpLabel}
                        placeholder={labels.otpPlaceholder}
                        error={!!fieldState.error}
                        centerText
                        inputProps={{ maxLength: 6 }}
                      />
                    )}
                  />

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                    }}
                  >
                    {!isExpired ? (
                      <>
                        <Typography sx={{ color: 'action.hover', fontWeight: 500 }}>
                          {formatTime()}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                          {labels.otpTimer}
                        </Typography>
                      </>
                    ) : (
                      <Box
                        component="button"
                        type="button"
                        onClick={handleResendOtp}
                        disabled={resendingOtp}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          border: 'none',
                          background: 'none',
                          color: 'action.hover',
                          cursor: 'pointer',
                          p: 0,
                          font: 'inherit',
                          '&:disabled': {
                            opacity: 0.6,
                          },
                        }}
                      >
                        {resendingOtp ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : (
                          <RestartAltOutlinedIcon sx={{ fontSize: 18 }} />
                        )}
                        {labels.otpResend}
                      </Box>
                    )}
                  </Box>

                  <Button
                    fullWidth
                    radius="md"
                    onClick={handleOtpSubmit(submitOtp)}
                    disabled={!isOtpValid || submittingOtp}
                    sx={{
                      backgroundColor: 'secondary.main',
                      '&:hover': {
                        backgroundColor: 'secondary.dark',
                      },
                    }}
                  >
                    {submittingOtp ? (
                      <CircularProgress size={18} sx={{ color: 'common.white' }} />
                    ) : (
                      labels.otpSubmit
                    )}
                  </Button>
                </Box>
              </Container>
            </Box>
          ) : (
            <Box sx={{ py: 2 }}>
              <Container>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                    <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                      {labels.balanceLabel}
                    </Typography>
                    <Typography sx={{ fontSize: 24, fontWeight: 700, color: 'text.primary' }}>
                      {balanceText}
                    </Typography>
                  </Box>

                  <Divider />

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Controller
                      control={control}
                      name="amount"
                      render={({ field }) => (
                        <NumberInput
                          value={field.value}
                          onChange={(event) => field.onChange(digitsOnly(event.target.value))}
                          label={labels.amountLabel}
                          placeholder={labels.amountPlaceholder}
                          error={!!withdrawErrors.amount}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 1,
                            },
                            '& .MuiOutlinedInput-input': {
                              textAlign: 'right',
                            },
                            '& .MuiOutlinedInput-input::placeholder': {
                              textAlign: 'right',
                              opacity: 1,
                            },
                          }}
                        />
                      )}
                    />

                    <Button
                      variant="outline"
                      radius="md"
                      onClick={handleFillAllBalance}
                      sx={{
                        alignSelf: 'flex-end',
                        color: 'text.primary',
                        borderColor: 'divider',
                        px: 1.5,
                        py: 0.5,
                        minHeight: 30,
                      }}
                    >
                      {labels.withdrawAll}
                    </Button>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Controller
                      control={control}
                      name="sheba"
                      render={({ field }) => (
                        <NumberInput
                          value={field.value}
                          onChange={(event) =>
                            field.onChange(digitsOnly(event.target.value).slice(0, 24))
                          }
                          label={labels.shebaLabel}
                          firstContent={
                            shebaIsValid ? (
                              <CheckCircleOutlinedIcon sx={{ color: 'success.main' }} />
                            ) : undefined
                          }
                          endContent={
                            <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>
                              IR
                            </Typography>
                          }
                          error={!!withdrawErrors.sheba}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 1,
                            },
                            '& .MuiOutlinedInput-input': {
                              textAlign: 'left',
                            },
                            '& .MuiOutlinedInput-input::placeholder': {
                              textAlign: 'left',
                              opacity: 1,
                            },
                          }}
                        />
                      )}
                    />

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: withdrawErrors.sheba ? 'error.main' : 'text.secondary',
                      }}
                    >
                      <ErrorOutlineOutlinedIcon sx={{ fontSize: 15 }} />
                      <Typography sx={{ fontSize: 12, color: 'inherit' }}>
                        {withdrawErrors.sheba ? labels.shebaError : labels.shebaHelper}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider />

                  <Button
                    fullWidth
                    radius="md"
                    onClick={handleWithdrawSubmit(submitWithdraw)}
                    disabled={!isWithdrawFormValid || submittingWithdraw}
                    sx={{
                      backgroundColor: 'secondary.main',
                      '&:hover': {
                        backgroundColor: 'secondary.dark',
                      },
                    }}
                  >
                    {submittingWithdraw ? (
                      <CircularProgress size={18} sx={{ color: 'common.white' }} />
                    ) : (
                      labels.submit
                    )}
                  </Button>

                  <Box
                    sx={(theme) => ({
                      width: '100%',
                      borderRadius: 1,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      p: 1,
                    })}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          backgroundColor: 'primary.main',
                          color: 'common.white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <ErrorOutlineOutlinedIcon sx={{ fontSize: 15 }} />
                      </Box>
                      <Typography sx={{ fontSize: 12, color: 'text.primary' }}>
                        {labels.note}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Container>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
