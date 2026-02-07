export type NotificationStatus = 'read' | 'unread';

export type NotificationsFilterTab = 'all' | 'read' | 'unread';

export interface NotificationItem {
  id: string;
  status: NotificationStatus;
  message: string;
  date: string;
}

export interface NotificationsTexts {
  title: string;
  tabs: Record<NotificationsFilterTab, string>;
  emptyState: {
    description: string;
  };
}
