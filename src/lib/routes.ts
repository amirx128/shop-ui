export const ROUTES = {
  BASE: '/',
  AUTH: '/auth',
  CART: '/cart',
  SHOP: '/shop',
  profile: {
    BASE: '/profile',
    ACCOUNT: '/profile/account',
    ORDERS: '/profile/orders',
    ORDER_DETAIL: '/profile/orders/order',
    WALLET: '/profile/wallet',
    WALLET_TRANSACTIONS: '/profile/wallet/transactions',
    FAVORITES: '/profile/favorites',
    COMMENTS: '/profile/comments',
    ADDRESSES: '/profile/addresses',
    NOTIFICATIONS: '/profile/notifications',
    CONTACT_US: '/contactus',
    ABOUT_US: '/aboutus',
  },
} as const;

export const PROTECTED_ROUTES = [
  // add protected routes here
] as const;

export type RouteKey = keyof typeof ROUTES;
