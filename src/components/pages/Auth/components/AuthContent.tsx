'use client';

import { useState } from 'react';
import { Container } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import PhoneForm from './PhoneForm';
import OTPForm from './OTPForm';
import type { PhoneFormData, OTPFormData } from '../types';
import { authService } from '@/services/auth.service';
import { identityService } from '@/services/identity.service';
import { authStorage } from '@/lib/storage/authStorage';
import { useRouter } from 'next/navigation';

export default function AuthContent() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');

  const getErrorMessage = (error: unknown, fallback: string) => {
    if (error && typeof error === 'object') {
      const message = (error as { response?: { data?: { message?: string } } })
        .response?.data?.message;
      if (message) {
        return message;
      }
    }
    return fallback;
  };

  const lastOtpMutation = useMutation({
    mutationFn: authService.getLastOtp,
    onSuccess: (data) => {
      console.log('Last OTP:', data);
    },
    onError: (error) => {
      console.error('Last OTP error:', error);
    },
  });

  const requestOtpMutation = useMutation({
    mutationFn: authService.requestOtp,
    onSuccess: (data, variables) => {
      setPhoneNumber(variables.phoneNumber);
      setStep('otp');
      toast.success(data?.message ?? 'مسیج اعتبار سنجی ارسال شد');
      lastOtpMutation.mutate();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'خطا در ارسال مسیج'));
    },
  });

  const loginOtpMutation = useMutation({
    mutationFn: authService.loginOtp,
    onSuccess: async (data) => {
      const accessToken = data?.accessToken;
      const refreshToken = data?.refreshToken;

      if (accessToken || refreshToken) {
        authStorage.setTokens(accessToken, refreshToken);
      }

      if (accessToken) {
        try {
          const profile = await identityService.getProfile(accessToken);
          authStorage.setProfile(profile);
        } catch (error) {
          console.error('Failed to load identity profile', error);
        }
      }

      toast.success(data?.message ?? 'ورود موفق');
      router.push('/fa/mobile');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, 'خطای اعتبار سنجی '));
    },
  });

  const handlePhoneSubmit = (data: PhoneFormData) => {
    requestOtpMutation.mutate({ phoneNumber: data.phoneNumber });
  };

  const handleOTPSubmit = (data: OTPFormData) => {
    loginOtpMutation.mutate({ phoneNumber, code: data.otp });
  };

  const handleResendCode = () => {
    if (!phoneNumber) {
      return;
    }
    requestOtpMutation.mutate({ phoneNumber });
  };

  const handleBack = () => {
    setStep('phone');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {step === 'phone' ? (
        <PhoneForm
          onSubmit={handlePhoneSubmit}
          isSubmitting={requestOtpMutation.isPending}
        />
      ) : (
        <OTPForm
          phoneNumber={phoneNumber}
          onSubmit={handleOTPSubmit}
          onResendCode={handleResendCode}
          onBack={handleBack}
          isSubmitting={loginOtpMutation.isPending}
          isResending={requestOtpMutation.isPending}
        />
      )}
    </Container>
  );
}
