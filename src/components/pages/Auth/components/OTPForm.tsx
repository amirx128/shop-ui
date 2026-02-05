'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Box, Typography, IconButton, Link, CircularProgress } from '@mui/material';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import Image from 'next/image';
import NumberInput from '@/components/ui/NumberInput';
import Button from '@/components/ui/Button';
import { useCountdown } from '../hooks/useCountdown';
import type { OTPFormData } from '../types';

interface OTPFormProps {
  phoneNumber: string;
  onSubmit: (data: OTPFormData) => void;
  onResendCode: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  isResending: boolean;
}

export default function OTPForm({
  phoneNumber,
  onSubmit,
  onResendCode,
  onBack,
  isSubmitting,
  isResending,
}: OTPFormProps) {
  const t = useTranslations('auth');

  const otpSchema = z.object({
    otp: z
      .string()
      .min(6, t('otp.error'))
      .max(6, t('otp.error'))
      .regex(/^\d{6}$/, t('otp.error')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    mode: 'onChange',
  });

  const { isExpired, reset, formatTime } = useCountdown(180);

  const handleResendCode = () => {
    if (isResending) {
      return;
    }
    reset();
    onResendCode();
  };

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        px: 2,
        py: 4,
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <IconButton
          onClick={onBack}
          sx={{
            position: 'absolute',
            right: 16,
            width: 40,
            height: 40,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
          }}
        >
          <KeyboardArrowRightOutlinedIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '80px',
          mt: '100px',
        }}
      >
        <Box
          sx={{ display: 'flex', justifyContent: 'center', mt: 4.5, mb: 4.5 }}
        >
          <Link href="/" sx={{ display: 'flex', textDecoration: 'none' }}>
            <Image
              src="/logo.svg"
              alt="Logo"
              width={131}
              height={48}
              priority
            />
          </Link>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          <Typography
            sx={{
              textAlign: 'right',
              color: 'text.primary',
              fontSize: '24px',
              fontWeight: 700,
            }}
          >
            {t('otp.title')}
          </Typography>

          <NumberInput
            {...register('otp')}
            label={t('otp.label', {
              phoneNumber: formatPhoneNumber(phoneNumber),
            })}
            placeholder={t('otp.placeholder')}
            error={!!errors.otp}
            errorMessage={
              errors.otp && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                  {errors.otp.message}
                </Box>
              )
            }
            centerText
            inputProps={{ maxLength: 6 }}
            sx={{ maxWidth: 400 }}
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
                <Typography
                  variant="body2"
                  sx={{
                    color: 'action.hover',
                    fontWeight: 500,
                  }}
                >
                  {formatTime()}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  {t('otp.timer')}
                </Typography>
              </>
            ) : (
              <Box
                component="button"
                type="button"
                onClick={handleResendCode}
                disabled={isResending}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'action.hover',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  p: 0,
                  '&:hover': {
                    opacity: 0.8,
                  },
                  '&:disabled': {
                    cursor: 'not-allowed',
                    opacity: 0.6,
                  },
                }}
              >
                {isResending ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <RestartAltOutlinedIcon sx={{ fontSize: 18 }} />
                )}
                {t('otp.resend')}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
        }}
      >
        <Button
          type="submit"
          variant="solid"
          fullWidth
          disabled={!isValid || isSubmitting}
          sx={{
            py: 1.5,
            color: 'common.white',
            '&:disabled': {
              backgroundColor: 'divider',
              color: 'common.white',
            },
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            t('otp.submit')
          )}
        </Button>

        <Typography
          variant="caption"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mt: 2,
          }}
        >
          {t.rich('terms.agreement', {
            terms: (chunks) => (
              <Link
                href="/terms"
                sx={{
                  color: 'action.hover',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {chunks}
              </Link>
            ),
            privacy: (chunks) => (
              <Link
                href="/privacy"
                sx={{
                  color: 'action.hover',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {chunks}
              </Link>
            ),
          })}
        </Typography>
      </Box>
    </Box>
  );
}
