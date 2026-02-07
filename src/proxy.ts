import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';
import { NextRequest, NextResponse } from 'next/server';
import { PROTECTED_ROUTES } from './lib/routes';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false,
});

const DEVICE_SEGMENTS = new Set(['mobile', 'desktop']);

export default function proxy(request: NextRequest) {
  const localePattern = locales.join('|');
  const pathname = request.nextUrl.pathname;
  const pathnameWithoutLocale =
    pathname.replace(new RegExp(`^/(${localePattern})(?=/|$)`, 'i'), '') || '/';

  const token = request.cookies.get('token')?.value;

  const pathnameWithoutDevice = stripDeviceSegment(pathnameWithoutLocale);

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathnameWithoutDevice.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = `/${defaultLocale}`;
      return NextResponse.redirect(url);
    }
  }

  const deviceRedirect = getDeviceRedirect(
    request,
    pathname,
    pathnameWithoutLocale
  );
  if (deviceRedirect) {
    return NextResponse.redirect(deviceRedirect);
  }

  const response = intlMiddleware(request);
  response.headers.set('x-pathname', pathname);
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

function stripDeviceSegment(pathnameWithoutLocale: string) {
  const segments = pathnameWithoutLocale.split('/').filter(Boolean);
  if (segments.length === 0) {
    return '/';
  }

  if (DEVICE_SEGMENTS.has(segments[0])) {
    const rest = segments.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }

  return pathnameWithoutLocale;
}

function getDeviceRedirect(
  request: NextRequest,
  pathname: string,
  pathnameWithoutLocale: string
) {
  const segments = pathnameWithoutLocale.split('/').filter(Boolean);
  if (segments.length > 0 && DEVICE_SEGMENTS.has(segments[0])) {
    return null;
  }

  const locale = getLocaleFromPath(pathname);
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile =
    /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  const deviceSegment = isMobile ? 'mobile' : 'desktop';
  const normalizedPath = normalizeDevicePath(pathnameWithoutLocale);
  const targetPath = `/${locale}/${deviceSegment}${normalizedPath}`;

  if (targetPath === pathname) {
    return null;
  }

  const url = request.nextUrl.clone();
  url.pathname = targetPath;
  return url;
}

function getLocaleFromPath(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const localeCandidate = segments[0];
  if (localeCandidate && locales.includes(localeCandidate as (typeof locales)[number])) {
    return localeCandidate;
  }

  return defaultLocale;
}

function normalizeDevicePath(pathnameWithoutLocale: string) {
  if (!pathnameWithoutLocale || pathnameWithoutLocale === '/') {
    return '';
  }

  if (/^\/auth\/login\/?$/.test(pathnameWithoutLocale)) {
    return '/auth';
  }

  return pathnameWithoutLocale;
}
