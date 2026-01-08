import Cookies from 'js-cookie';

export function setCookie(name: string, value: string, expirationDate?: Date) {
  if (typeof window === 'undefined') return;

  const expires =
    expirationDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  Cookies.set(name, value, {
    expires,
    path: '/',
    sameSite: 'Lax',
  });
}

export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;

  return Cookies.get(name) ?? null;
}

export function deleteCookie(name: string) {
  if (typeof window === 'undefined') return;
  Cookies.remove(name, { path: '/' });
}
