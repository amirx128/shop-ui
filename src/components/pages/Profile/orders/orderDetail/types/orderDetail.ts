export interface OrderDetailSummaryItem {
  id: string;
  label?: string;
  value: string;
  fullWidth?: boolean;
}

export type OrderDetailStatus =
  | 'processing'
  | 'delivered'
  | 'returned'
  | 'canceled';

export interface CancelOrderLabels {
  action: string;
  modalTitle: string;
  modalQuestion: string;
  confirm: string;
  dismiss: string;
}

export interface ProcessingOrderModalLabels {
  title: string;
  description: string;
  action: string;
}

export interface DeliveredReviewModalLabels {
  action: string;
  rateTitle: string;
  rateDescription: string;
  commentPlaceholder: string;
  submit: string;
  cancel: string;
  successTitle: string;
  successDescription: string;
  acknowledge: string;
}
