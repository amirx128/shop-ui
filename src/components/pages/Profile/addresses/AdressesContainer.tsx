import { Box, Container } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import { ROUTES } from '@/lib/routes';
import AddressesBodyClient from './components/AddressesBodyClient';
import AddressesHeader from './components/AddressesHeader';
import type { AddressItem, AddressesTexts } from './types/addresses';

export default async function AdressesContainer() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('profile'),
  ]);

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
      receiverName: t('addressesPage.fields.receiverName'),
      phone: t('addressesPage.fields.phone'),
      email: t('addressesPage.fields.email'),
      province: t('addressesPage.fields.province'),
      city: t('addressesPage.fields.city'),
      postalCode: t('addressesPage.fields.postalCode'),
      address: t('addressesPage.fields.address'),
    },
    validation: {
      required: t('addressesPage.validation.required'),
      email: t('addressesPage.validation.email'),
      phone: t('addressesPage.validation.phone'),
      postalCode: t('addressesPage.validation.postalCode'),
    },
  };

  const isFaLocale = locale.startsWith('fa');
  const initialAddresses: AddressItem[] = isFaLocale
    ? [
      {
        id: 'address-1',
        isDefault: true,
        receiverName: 'سارا احمدی',
        phone: '09120000000',
        email: 'sara@example.com',
        province: 'تهران',
        city: 'تهران',
        postalCode: '1234567890',
        address: 'تهران، سعادت آباد، میدان کاج، خیابان دوازدهم، پلاک ۲۱، واحد ۳',
      },
      {
        id: 'address-2',
        isDefault: false,
        receiverName: 'محمد رضایی',
        phone: '09123334444',
        email: '',
        province: 'البرز',
        city: 'کرج',
        postalCode: '0987654321',
        address: 'کرج، عظیمیه، بلوار استقلال، کوچه یاس، پلاک ۹',
      },
    ]
    : [
      {
        id: 'address-1',
        isDefault: true,
        receiverName: 'Sara Ahmadi',
        phone: '+98 912 000 0000',
        email: 'sara@example.com',
        province: 'Tehran',
        city: 'Tehran',
        postalCode: '1234567890',
        address: 'Tehran, Saadat Abad, Kaj Square, 12th St, No. 21, Unit 3',
      },
      {
        id: 'address-2',
        isDefault: false,
        receiverName: 'Mohammad Rezaei',
        phone: '+98 912 333 4444',
        email: '',
        province: 'Alborz',
        city: 'Karaj',
        postalCode: '0987654321',
        address: 'Karaj, Azimiyeh, Esteghlal Blvd, Yas Alley, No. 9',
      },
    ];

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
      <Box sx={{ py: 2, flexShrink: 0 }}>
        <Container>
          <AddressesHeader title={texts.title} backHref={ROUTES.profile.BASE} />
        </Container>
      </Box>

      <AddressesBodyClient
        texts={texts}
        initialAddresses={initialAddresses}
        formIdPrefix={formIdPrefix}
      />
    </Box>
  );
}
