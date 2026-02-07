import { Box } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import { ROUTES } from '@/lib/routes';
import NotificationsBodyClient from './components/NotificationsBodyClient';
import NotificationsHeader from './components/NotificationsHeader';
import type { NotificationItem, NotificationsTexts } from './types/notifications';

export default async function NotificationsContainer() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('profile'),
  ]);
  const isFaLocale = locale.startsWith('fa');

  const texts: NotificationsTexts = {
    title: t('items.notifications'),
    tabs: {
      all: t('notificationsPage.tabs.all'),
      read: t('notificationsPage.tabs.read'),
      unread: t('notificationsPage.tabs.unread'),
    },
    emptyState: {
      description: t('notificationsPage.emptyState.description'),
    },
  };
  const notificationMessage = t('notificationsPage.sample.message');

  const unreadNotifications: NotificationItem[] = Array.from({ length: 10 }, (_, index) => {
    const day = String(21 + index).padStart(2, '0');
    const minute = index % 2 === 0 ? '30' : '15';
    const hour = String(17 - (index % 5)).padStart(2, '0');

    return {
      id: `notification-unread-${index + 1}`,
      status: 'unread',
      message: notificationMessage,
      date: isFaLocale
        ? `${hour}:${minute} - 1402/10/${day}`
        : `${hour}:${minute} - 2024/01/${day}`,
    };
  });

  const readNotifications: NotificationItem[] = Array.from({ length: 10 }, (_, index) => {
    const day = String(11 + index).padStart(2, '0');
    const minute = index % 2 === 0 ? '45' : '10';
    const hour = String(15 - (index % 5)).padStart(2, '0');

    return {
      id: `notification-read-${index + 1}`,
      status: 'read',
      message: notificationMessage,
      date: isFaLocale
        ? `${hour}:${minute} - 1402/10/${day}`
        : `${hour}:${minute} - 2024/01/${day}`,
    };
  });

  const notifications: NotificationItem[] = [...unreadNotifications, ...readNotifications];

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
      <NotificationsHeader title={texts.title} backHref={ROUTES.profile.BASE} />

      <NotificationsBodyClient
        tabs={texts.tabs}
        emptyStateDescription={texts.emptyState.description}
        notifications={notifications}
      />
    </Box>
  );
}
