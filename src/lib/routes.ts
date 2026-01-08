export const ROUTES = {
  BASE: '/',
} as const;

export const PROTECTED_ROUTES = [
  // add protected routes here
] as const;

export type RouteKey = keyof typeof ROUTES;
