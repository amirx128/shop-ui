export interface AddressFormValues {
  title: string;
  provinceId: number;
  cityId: number;
  street: string;
  address: string;
  alley: string;
  plaque: string;
  unit: string;
  location: string;
}

export interface AddressItem {
  id: string;
  title: string;
  street: string;
  address: string;
  provinceId: number;
  cityId: number;
  provinceName: string;
  cityName: string;
  alley?: string;
  plaque?: string;
  unit?: string;
  location?: string;
  createdAtUtc: string;
  modifiedAtUtc?: string | null;
  isDefault: boolean;
}

export interface AddressFormLabels {
  title: string;
  province: string;
  city: string;
  street: string;
  address: string;
  alley: string;
  plaque: string;
  unit: string;
  location: string;
}

export interface AddressFormValidationMessages {
  required: string;
}

export interface AddressesTexts {
  title: string;
  emptyState: {
    description: string;
    imageAlt: string;
  };
  actions: {
    add: string;
    edit: string;
    editAddress: string;
    cancel: string;
  };
  labels: {
    selectedAddress: string;
    receiver: string;
  };
  fields: AddressFormLabels;
  validation: AddressFormValidationMessages;
  defaultAddressLabel: string;
  selectionHint: string;
}
