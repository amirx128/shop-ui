import { getLocale, getTranslations } from 'next-intl/server';
import { Box, Container } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import ProfileMenu from './components/ProfileMenu';
import type { ProfileMenuItem } from './types/profile';
import { ROUTES } from '@/lib/routes';

export default async function ProfileContainer() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('profile'),
  ]);

  const items: ProfileMenuItem[] = [
    {
      key: 'account',
      title: t('items.account'),
      icon: AccountCircleOutlinedIcon,
      href: ROUTES.profile.ACCOUNT,
    },
    {
      key: 'orders',
      title: t('items.orders'),
      icon: AssignmentTurnedInOutlinedIcon,
      href: ROUTES.profile.ORDERS,
    },
    {
      key: 'wallet',
      title: t('items.wallet'),
      icon: AccountBalanceWalletOutlinedIcon,
      href: ROUTES.profile.WALLET,
    },
    {
      key: 'favorites',
      title: t('items.favorites'),
      icon: FavoriteBorderOutlinedIcon,
      href: ROUTES.profile.FAVORITES,
    },
    {
      key: 'comments',
      title: t('items.comments'),
      icon: ModeCommentOutlinedIcon,
      href: ROUTES.profile.COMMENTS,
    },
    {
      key: 'addresses',
      title: t('items.addresses'),
      icon: LocationOnOutlinedIcon,
      href: ROUTES.profile.ADDRESSES,
    },
    {
      key: 'notifications',
      title: t('items.notifications'),
      icon: NotificationsNoneOutlinedIcon,
      href: ROUTES.profile.NOTIFICATIONS,
    },
    {
      key: 'contact',
      title: t('items.contact'),
      icon: PhoneOutlinedIcon,
      href: ROUTES.profile.CONTACT_US,
    },
    {
      key: 'about',
      title: t('items.about'),
      icon: ErrorOutlineOutlinedIcon,
      href: ROUTES.profile.ABOUT_US,
    },
    {
      key: 'logout',
      title: t('items.logout'),
      icon: ExitToAppOutlinedIcon,
    },
  ];

  const baseHref = `/${locale}/mobile`;
  const menuItems = items.map((item) => ({
    ...item,
    href: item.href ? `${baseHref}${item.href}` : undefined,
  }));

  return (
    <Box sx={{ backgroundColor: 'background.default', pb: 10 }}>
      <Container>
        <ProfileMenu items={menuItems} />
      </Container>
    </Box>
  );
}
