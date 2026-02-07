'use client';

import { useState } from 'react';
import { Box, ButtonBase, Container, Typography } from '@mui/material';
import NotificationCard from './NotificationCard';
import NotificationsBody from './NotificationsBody';
import type {
  NotificationItem,
  NotificationsFilterTab,
} from '../types/notifications';

interface NotificationsBodyClientProps {
  tabs: Record<NotificationsFilterTab, string>;
  emptyStateDescription: string;
  notifications: NotificationItem[];
}

const filterTabs: NotificationsFilterTab[] = ['all', 'read', 'unread'];

export default function NotificationsBodyClient({
  tabs,
  emptyStateDescription,
  notifications,
}: NotificationsBodyClientProps) {
  const [activeTab, setActiveTab] = useState<NotificationsFilterTab>('all');

  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === 'all') {
      return true;
    }

    return item.status === activeTab;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <Box sx={{ px: 1, py: 2, flexShrink: 0 }}>
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '9px',
            p: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'background.paper',
          }}
        >
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <ButtonBase
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                aria-pressed={isActive}
                sx={{
                  width: 108,
                  height: 32,
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  backgroundColor: isActive ? 'secondary.main' : 'transparent',
                  color: isActive ? 'common.white' : 'text.primary',
                }}
              >
                <Typography sx={{ fontSize: 13, fontWeight: 500, color: 'inherit' }}>
                  {tabs[tab]}
                </Typography>
              </ButtonBase>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
        {filteredNotifications.length === 0 ? (
          <NotificationsBody emptyStateDescription={emptyStateDescription} />
        ) : (
          <Container sx={{ pb: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {filteredNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </Box>
          </Container>
        )}
      </Box>
    </Box>
  );
}
