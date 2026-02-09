export type ContactusFoundUsValue =
  | 'instagram'
  | 'search'
  | 'friends'
  | 'advertisement'
  | 'other';

export interface ContactusFormValues {
  fullName: string;
  mobile: string;
  email: string;
  foundUs: string;
}

export interface ContactusValidationMessages {
  required: string;
  invalidMobile: string;
  invalidEmail: string;
}

export interface ContactusFoundUsOption {
  value: ContactusFoundUsValue;
  label: string;
}

export interface ContactusTexts {
  header: {
    title: string;
    backLabel: string;
  };
  content: {
    title: string;
    description: string;
  };
  form: {
    fields: {
      fullName: string;
      mobile: string;
      email: string;
      foundUs: string;
    };
    foundUsPlaceholder: string;
    options: ContactusFoundUsOption[];
    validation: ContactusValidationMessages;
    submit: string;
  };
  map: {
    popup: string;
    loading: string;
    loadingAlt: string;
  };
  contact: {
    emailLabel: string;
    emailValue: string;
    phoneLabel: string;
    phoneValue: string;
  };
}
