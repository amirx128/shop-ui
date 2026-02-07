import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface ProfileHeaderProps {
  title: string;
  subtitle: string;
  userName: string;
  userPhone: string;
  avatarAlt: string;
}

export default function ProfileHeader({
  title,
  subtitle,
  userName,
  userPhone,
  avatarAlt,
}: ProfileHeaderProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {subtitle}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2,
          borderRadius: 3,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            overflow: 'hidden',
            bgcolor: 'grey.100',
            flexShrink: 0,
          }}
        >
          <Image
            src="/images/home/tempAvatar.jpg"
            alt={avatarAlt}
            width={64}
            height={64}
            sizes="64px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography sx={{ fontWeight: 600 }}>{userName}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {userPhone}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
