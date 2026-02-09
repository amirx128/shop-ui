import { Box, Container } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import { ROUTES } from '@/lib/routes';
import ContactusBody from './components/ContactusBody';
import ContactusFormClient from './components/ContactusFormClient';
import ContactusHeader from './components/ContactusHeader';
import type { ContactusTexts } from './types';

export default async function ContactusContainer() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('contactus'),
  ]);

  const texts: ContactusTexts = {
    header: {
      title: t('header.title'),
      backLabel: t('header.backLabel'),
    },
    content: {
      title: t('content.title'),
      description: t('content.description'),
    },
    form: {
      fields: {
        fullName: t('form.fields.fullName'),
        mobile: t('form.fields.mobile'),
        email: t('form.fields.email'),
        foundUs: t('form.fields.foundUs'),
      },
      foundUsPlaceholder: t('form.foundUsPlaceholder'),
      options: [
        { value: 'instagram', label: t('form.foundUsOptions.instagram') },
        { value: 'search', label: t('form.foundUsOptions.search') },
        { value: 'friends', label: t('form.foundUsOptions.friends') },
        { value: 'advertisement', label: t('form.foundUsOptions.advertisement') },
        { value: 'other', label: t('form.foundUsOptions.other') },
      ],
      validation: {
        required: t('form.validation.required'),
        invalidMobile: t('form.validation.invalidMobile'),
        invalidEmail: t('form.validation.invalidEmail'),
      },
      submit: t('form.submit'),
    },
    map: {
      popup: t('map.popup'),
      loading: t('map.loading'),
      loadingAlt: t('map.loadingAlt'),
    },
    contact: {
      emailLabel: t('contact.emailLabel'),
      emailValue: t('contact.emailValue'),
      phoneLabel: t('contact.phoneLabel'),
      phoneValue: t('contact.phoneValue'),
    },
  };

  const backHref = `/${locale}/mobile${ROUTES.profile.BASE}`;

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100dvh - 72px)',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          flexShrink: 0,
        }}
      >
        <Container>
          <ContactusHeader
            title={texts.header.title}
            backHref={backHref}
            backLabel={texts.header.backLabel}
          />
        </Container>
      </Box>

      <ContactusBody
        title={texts.content.title}
        description={texts.content.description}
      >
        <ContactusFormClient
          formTexts={texts.form}
          mapTexts={texts.map}
          contactTexts={texts.contact}
        />
      </ContactusBody>
    </Box>
  );
}
