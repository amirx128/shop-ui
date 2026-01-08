export type AuthStep = 'phone' | 'otp';

export interface PhoneFormData {
  phoneNumber: string;
}

export interface OTPFormData {
  otp: string;
}

export interface AuthFormData extends PhoneFormData, OTPFormData {}
