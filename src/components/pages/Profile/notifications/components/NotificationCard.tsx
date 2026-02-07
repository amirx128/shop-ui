import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import MusicOffOutlinedIcon from '@mui/icons-material/MusicOffOutlined';
import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { NotificationItem } from '../types/notifications';

interface NotificationCardProps {
  notification: NotificationItem;
}

export default function NotificationCard({ notification }: NotificationCardProps) {
  const isUnread = notification.status === 'unread';

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '12px',
        p: 2,
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
        <Box
          sx={(theme) => ({
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: isUnread ? 'secondary.main' : 'text.secondary',
            backgroundColor: isUnread
              ? alpha(theme.palette.secondary.main, 0.05)
              : theme.palette.grey[100],
          })}
        >
          {isUnread ? (
            <MusicNoteOutlinedIcon sx={{ fontSize: 18 }} />
          ) : (
            <MusicOffOutlinedIcon sx={{ fontSize: 18 }} />
          )}
        </Box>

        <Typography
          sx={{
            flex: 1,
            fontSize: 14,
            lineHeight: 1.9,
            color: 'text.primary',
            fontWeight: isUnread ? 700 : 400,
          }}
        >
          {notification.message}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: 12,
          lineHeight: 1.6,
          color: 'text.secondary',
          textAlign: 'left',
          direction: 'ltr',
        }}
      >
        {notification.date}
      </Typography>
    </Box>
  );
}
