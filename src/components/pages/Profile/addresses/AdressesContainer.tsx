import { Box } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import AddressesBodyClient from './components/AddressesBodyClient';
import type { AddressesTexts } from './types/addresses';

export default async function AdressesContainer() {
  const [locale, t] = await Promise.all([getLocale(), getTranslations('profile')]);

  const texts: AddressesTexts = {
    title: t('items.addresses'),
    emptyState: {
      description: t('addressesPage.emptyState.description'),
      imageAlt: t('addressesPage.emptyState.imageAlt'),
    },
    actions: {
      add: t('addressesPage.actions.add'),
      edit: t('addressesPage.actions.edit'),
      editAddress: t('addressesPage.actions.editAddress'),
      cancel: t('addressesPage.actions.cancel'),
    },
    labels: {
      selectedAddress: t('addressesPage.labels.selectedAddress'),
      receiver: t('addressesPage.labels.receiver'),
    },
    fields: {
      title: t('addressesPage.fields.title'),
      province: t('addressesPage.fields.province'),
      city: t('addressesPage.fields.city'),
      street: t('addressesPage.fields.street'),
      address: t('addressesPage.fields.address'),
      alley: t('addressesPage.fields.alley'),
      plaque: t('addressesPage.fields.plaque'),
      unit: t('addressesPage.fields.unit'),
      location: t('addressesPage.fields.location'),
    },
    validation: {
      required: t('addressesPage.validation.required'),
    },
    defaultAddressLabel: t('addressesPage.defaultAddressLabel'),
    selectionHint: t('addressesPage.selectionHint'),
  };

  const formIdPrefix = `address-form-${locale}`;

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <AddressesBodyClient texts={texts} formIdPrefix={formIdPrefix} />
    </Box>
  );
}
