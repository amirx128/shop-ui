import type { SvgIconComponent } from '@mui/icons-material';

export interface ProfileMenuItem {
  key: string;
  title: string;
  icon: SvgIconComponent;
  href?: string;
  isDestructive?: boolean;
}
