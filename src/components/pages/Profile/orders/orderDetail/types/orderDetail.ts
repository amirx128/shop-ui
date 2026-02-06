export interface OrderDetailSummaryItem {
  id: string;
  label?: string;
  value: string;
  fullWidth?: boolean;
}

export interface CancelOrderLabels {
  action: string;
  modalTitle: string;
  modalQuestion: string;
  confirm: string;
  dismiss: string;
}
