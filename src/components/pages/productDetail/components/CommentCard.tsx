'use client';

import { Box, Typography, Avatar } from '@mui/material';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

interface CommentCardProps {
  userName: string;
  comment: string;
  avatar: string;
  fullWidth?: boolean;
}

export default function CommentCard({
  userName,
  comment,
  avatar,
  fullWidth = false,
}: CommentCardProps) {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '8px',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: fullWidth ? '100%' : 230,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
        }}
      >
        <Avatar
          src={avatar}
          alt={userName}
          sx={{
            width: 47,
            height: 47,
            borderRadius: '8px',
            flexShrink: 0,
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
            }}
          >
            {userName}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 0.25,
            }}
          >
            {[...Array(5)].map((_, index) => (
              <StarOutlinedIcon
                key={index}
                sx={{
                  fontSize: 16,
                  color: '#F5A524',
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          lineHeight: 1.6,
        }}
      >
        {comment}
      </Typography>
    </Box>
  );
}
