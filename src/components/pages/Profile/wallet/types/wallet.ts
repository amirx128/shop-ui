export type WalletTransactionType = 'purchase' | 'charge' | 'refund' | 'gift';

export type WalletTransactionDirection = 'increase' | 'decrease';

export interface WalletTransaction {
  id: string;
  type: WalletTransactionType;
  title: string;
  date: string;
  amount: number;
  direction: WalletTransactionDirection;
}

export interface WalletTransactionDisplay extends WalletTransaction {
  formattedAmount: string;
}

export interface WalletChargePresetOption {
  value: number;
  label: string;
}

export interface WalletChargeModalLabels {
  trigger: string;
  title: string;
  balanceLabel: string;
  selectAmountLabel: string;
  customAmountLabel: string;
  customAmountPlaceholder: string;
  submit: string;
  successDescription: string;
  acknowledge: string;
}

export interface WalletWithdrawModalLabels {
  trigger: string;
  title: string;
  balanceLabel: string;
  amountLabel: string;
  amountPlaceholder: string;
  withdrawAll: string;
  shebaLabel: string;
  shebaPlaceholder: string;
  shebaHelper: string;
  shebaError: string;
  submit: string;
  note: string;
  otpTitle: string;
  otpLabel: string;
  otpPlaceholder: string;
  otpTimer: string;
  otpResend: string;
  otpSubmit: string;
  successDescription: string;
  acknowledge: string;
}
