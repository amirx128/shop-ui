import { Box, Container } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import CommentsHeader from './components/CommentsHeader';
import CommentsClient from './CommentsClient';
import type { CommentStatusLabels } from './types/comments';
import { ROUTES } from '@/lib/routes';

export default async function CommentsContainer() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('profile'),
  ]);

  const isFaLocale = locale.startsWith('fa');

  const statusLabels: CommentStatusLabels = isFaLocale
    ? {
        approved: 'تایید شده',
        rejected: 'تایید نشده',
        pending: 'در حال بررسی',
      }
    : {
        approved: 'Approved',
        rejected: 'Not approved',
        pending: 'Under review',
      };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <CommentsHeader title={t('items.comments')} backHref={ROUTES.profile.BASE} />

      <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <Container sx={{ py: 2 }}>
          <CommentsClient statusLabels={statusLabels} />
        </Container>
      </Box>
    </Box>
  );
}
