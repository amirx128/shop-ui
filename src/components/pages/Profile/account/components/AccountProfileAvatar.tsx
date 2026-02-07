import { Box } from '@mui/material';
import Image from 'next/image';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

interface AccountProfileAvatarProps {
  src: string;
  alt: string;
  inputId?: string;
}

export default function AccountProfileAvatar({
  src,
  alt,
  inputId = 'account-profile-avatar',
}: AccountProfileAvatarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 180,
          height: 180,
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="180px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>
        <Box
          component="label"
          htmlFor={inputId}
          sx={{
            position: 'absolute',
            right: 6,
            bottom: 6,
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: 'common.white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 1,
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          <CreateOutlinedIcon sx={{ fontSize: 18, color: 'text.primary' }} />
        </Box>
        <Box
          component="input"
          id={inputId}
          type="file"
          accept="image/*"
          sx={{ display: 'none' }}
        />
      </Box>
    </Box>
  );
}
