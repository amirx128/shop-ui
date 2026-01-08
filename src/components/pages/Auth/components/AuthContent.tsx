'use client';

import { useState } from 'react';
import { Container } from '@mui/material';
import PhoneForm from './PhoneForm';
import OTPForm from './OTPForm';
import type { PhoneFormData, OTPFormData } from '../types';

export default function AuthContent() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneSubmit = (data: PhoneFormData) => {
    setPhoneNumber(data.phoneNumber);
    setStep('otp');
  };

  const handleOTPSubmit = (data: OTPFormData) => {
    console.log('OTP submitted:', data);
  };

  const handleResendCode = () => {
    console.log('Resending code to:', phoneNumber);
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
        <PhoneForm onSubmit={handlePhoneSubmit} />
      ) : (
        <OTPForm
          phoneNumber={phoneNumber}
          onSubmit={handleOTPSubmit}
          onResendCode={handleResendCode}
          onBack={handleBack}
        />
      )}
    </Container>
  );
}
