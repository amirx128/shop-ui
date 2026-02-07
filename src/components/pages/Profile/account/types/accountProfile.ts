export interface AccountProfileFormValues {
  fullName: string;
  email: string;
  phone: string;
  postalCode: string;
  province: string;
  city: string;
  address: string;
}

export interface AccountProfileFormLabels {
  fullName: string;
  email: string;
  phone: string;
  postalCode: string;
  province: string;
  city: string;
  address: string;
}

export interface AccountProfileFormValidationMessages {
  required: string;
  email: string;
}

export interface AccountProfileFormTexts {
  labels: AccountProfileFormLabels;
  validation: AccountProfileFormValidationMessages;
}
