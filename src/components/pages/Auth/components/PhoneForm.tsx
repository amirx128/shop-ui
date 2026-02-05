'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Box, Typography, Link, CircularProgress } from '@mui/material';
import Image from 'next/image';
import NumberInput from '@/components/ui/NumberInput';
import Button from '@/components/ui/Button';
import type { PhoneFormData } from '../types';

interface PhoneFormProps {
  onSubmit: (data: PhoneFormData) => void;
  isSubmitting: boolean;
}

export default function PhoneForm({ onSubmit, isSubmitting }: PhoneFormProps) {
  const t = useTranslations('auth');

  const phoneSchema = z.object({
    phoneNumber: z
      .string()
      .min(11, t('phone.error'))
      .max(11, t('phone.error'))
      .regex(/^09\d{9}$/, t('phone.error')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    mode: 'onChange',
  });

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
          flexDirection: 'column',
          gap: '80px',
          mt: '100px',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
            {t('phone.title')}
          </Typography>

          <NumberInput
            {...register('phoneNumber')}
            label={t('phone.label')}
            placeholder={t('phone.placeholder')}
            error={!!errors.phoneNumber}
            errorMessage={errors.phoneNumber?.message}
            sx={{ maxWidth: 400 }}
          />
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
            t('phone.submit')
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
