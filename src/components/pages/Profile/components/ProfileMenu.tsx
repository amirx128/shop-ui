import { Box } from '@mui/material';
import Divider from '@/components/ui/Divider';
import ProfileMenuItem from './ProfileMenuItem';
import type { ProfileMenuItem as ProfileMenuItemType } from '../types/profile';

interface ProfileMenuProps {
  items: ProfileMenuItemType[];
}

export default function ProfileMenu({ items }: ProfileMenuProps) {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      {items.map((item) => (
        <Box key={item.key}>
          <ProfileMenuItem item={item} />
          <Divider />
        </Box>
      ))}
    </Box>
  );
}
