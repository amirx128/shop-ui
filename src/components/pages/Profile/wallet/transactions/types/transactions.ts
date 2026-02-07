export type WalletTransactionsFilterTab = 'all' | 'deposit' | 'withdraw';
export type WalletTransactionType = 'purchase' | 'charge' | 'refund' | 'gift';
export type WalletTransactionDirection = 'increase' | 'decrease';
export type WalletTransactionStatus = 'success' | 'failed';

export interface WalletTransactionsHeaderLabels {
  backToWallet: string;
  filters: string;
}

export interface WalletTransactionsFilterTabOption {
  value: WalletTransactionsFilterTab;
  label: string;
  count: number;
}

export interface WalletTransactionsAccountOption {
  value: string;
  label: string;
}

export interface WalletTransactionsFilterValidationMessages {
  amountRange: string;
  dateRange: string;
}

export interface WalletTransactionsFilterLabels {
  title: string;
  accountTypePlaceholder: string;
  transactionAmountTitle: string;
  amountToPlaceholder: string;
  amountFromPlaceholder: string;
  transactionDateTitle: string;
  dateFromPlaceholder: string;
  dateToPlaceholder: string;
  apply: string;
  validation: WalletTransactionsFilterValidationMessages;
}

export interface WalletTransactionsFilterFormValues {
  tab: WalletTransactionsFilterTab;
  accountType: string;
  amountTo: string;
  amountFrom: string;
  dateFrom: Date | null;
  dateTo: Date | null;
}

export interface WalletTransactionItem {
  id: string;
  type: WalletTransactionType;
  title: string;
  date: string;
  amount: string;
  direction: WalletTransactionDirection;
  status: WalletTransactionStatus;
}

export interface TransactionCardLabels {
  success: string;
  failed: string;
  details: string;
  currency: string;
}
