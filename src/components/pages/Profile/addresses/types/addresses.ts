export interface AddressFormValues {
  receiverName: string;
  phone: string;
  email: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
}

export interface AddressItem extends AddressFormValues {
  id: string;
  isDefault: boolean;
}

export interface AddressFormLabels {
  receiverName: string;
  phone: string;
  email: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
}

export interface AddressFormValidationMessages {
  required: string;
  email: string;
  phone: string;
  postalCode: string;
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
}
