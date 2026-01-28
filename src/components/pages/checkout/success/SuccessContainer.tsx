'use client';

import { Box } from '@mui/material';
import SuccessBody from './components/SuccessBody';
import SuccessFooter from './components/SuccessFooter';
import { SuccessTranslations } from './types/success';

interface SuccessContainerProps {
  translations: SuccessTranslations;
  homeHref: string;
}

export default function SuccessContainer({
  translations,
  homeHref,
}: SuccessContainerProps) {
  return (
    <Box sx={{ minHeight: '95vh', display: 'flex', flexDirection: 'column' }}>
      <SuccessBody
        title={translations.title}
        description={translations.description}
      />
      <SuccessFooter
        actionLabel={translations.actionLabel}
        actionHref={homeHref}
      />
    </Box>
  );
}
