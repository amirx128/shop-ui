import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';
import { NextRequest, NextResponse } from 'next/server';
import { PROTECTED_ROUTES } from './lib/routes';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false,
});

export default function proxy(request: NextRequest) {
  const localePattern = locales.join('|');
  const pathname = request.nextUrl.pathname;
  const pathnameWithoutLocale =
    pathname.replace(new RegExp(`^/(${localePattern})(?=/|$)`, 'i'), '') || '/';

  const token = request.cookies.get('token')?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathnameWithoutLocale.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = `/${defaultLocale}`;
      return NextResponse.redirect(url);
    }
  }

  const response = intlMiddleware(request);
  response.headers.set('x-pathname', pathname);
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
