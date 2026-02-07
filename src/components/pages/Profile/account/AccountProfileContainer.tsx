import { Box, Container } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import AccountProfileHeader from './components/AccountProfileHeader';
import AccountProfileAvatar from './components/AccountProfileAvatar';
import AccountProfileForm from './components/AccountProfileForm';
import AccountProfileActions from './components/AccountProfileActions';
import type {
  AccountProfileFormTexts,
  AccountProfileFormValues,
} from './types/accountProfile';
import { ROUTES } from '@/lib/routes';

export default async function AccountProfileContainer() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('profile'),
  ]);

  const formTexts: AccountProfileFormTexts = {
    labels: {
      fullName: t('accountProfile.fields.fullName'),
      email: t('accountProfile.fields.email'),
      phone: t('accountProfile.fields.phone'),
      postalCode: t('accountProfile.fields.postalCode'),
      province: t('accountProfile.fields.province'),
      city: t('accountProfile.fields.city'),
      address: t('accountProfile.fields.address'),
    },
    validation: {
      required: t('accountProfile.validation.required'),
      email: t('accountProfile.validation.email'),
    },
  };

  const defaultValues: AccountProfileFormValues = {
    fullName: '',
    email: '',
    phone: '',
    postalCode: '',
    province: '',
    city: '',
    address: '',
  };

  const formId = `account-profile-form-${locale}`;

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ py: 2, backgroundColor: 'background.default' }}>
        <Container>
          <AccountProfileHeader
            title={t('accountProfile.title')}
            backHref={ROUTES.profile.BASE}
          />
        </Container>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Container>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 2,
                p: 2,
              }}
            >
              <AccountProfileAvatar
                src="/images/home/tempAvatar.jpg"
                alt={t('avatarAlt')}
              />
            </Box>

            <Box
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 2,
                p: 2,
              }}
            >
              <AccountProfileForm
                formId={formId}
                texts={formTexts}
                defaultValues={defaultValues}
              />
            </Box>

            <Box
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 2,
                p: 2,
              }}
            >
              <AccountProfileActions
                formId={formId}
                saveLabel={t('accountProfile.actions.save')}
                cancelLabel={t('accountProfile.actions.cancel')}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
