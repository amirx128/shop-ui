export interface CheckoutAddress {
  id: string;
  receiverName: string;
  phone: string;
  email?: string;
  province: string;
  city: string;
  postalCode: string;
  addressLine: string;
}

export interface SummaryRow {
  title: string;
  value: string;
  color?: string;
}

export interface AddressFormValues {
  receiverName: string;
  phone: string;
  email?: string;
  provinceId: number;
  cityId: number;
  street: string;
  addressLine: string;
}
