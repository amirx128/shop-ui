import { Container, Box } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NavItem from './components/NavItem';
import type { NavItem as NavItemType } from './types';
import { ROUTES } from '@/lib/routes';

const navItems: NavItemType[] = [
  {
    icon: HomeOutlinedIcon,
    label: 'home',
    href: '#',
    key: 'home',
  },
  {
    icon: DashboardOutlinedIcon,
    label: 'categories',
    href: '#',
    key: 'categories',
  },
  {
    icon: StorefrontOutlinedIcon,
    label: 'store',
    href: '#',
    key: 'store',
  },
  {
    icon: ShoppingBasketOutlinedIcon,
    label: 'cart',
    href: ROUTES.CART,
    key: 'cart',
  },
  {
    icon: AccountCircleOutlinedIcon,
    label: 'profile',
    href: ROUTES.AUTH,
    key: 'profile',
  },
];

export default function Navbar() {
  return (
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        zIndex: 1000,
        py: '16',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {navItems.map((item) => (
            <NavItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              href={item.href}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
