export const ROUTES = {
  BASE: '/',
  AUTH: '/auth',
} as const;

export const PROTECTED_ROUTES = [
  // add protected routes here
] as const;

export type RouteKey = keyof typeof ROUTES;
