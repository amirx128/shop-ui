'use client';

import { Box } from '@mui/material';
import ErrorBody from './components/ErrorBody';
import ErrorFooter from './components/ErrorFooter';
import { ErrorTranslations } from './types/error';

interface ErrorContainerProps {
  translations: ErrorTranslations;
  homeHref: string;
}

export default function ErrorContainer({
  translations,
  homeHref,
}: ErrorContainerProps) {
  return (
    <Box sx={{ minHeight: '95vh', display: 'flex', flexDirection: 'column' }}>
      <ErrorBody
        title={translations.title}
        description={translations.description}
      />
      <ErrorFooter
        actionLabel={translations.actionLabel}
        actionHref={homeHref}
      />
    </Box>
  );
}
