import { cookies } from 'next/headers';

export async function getServerCookie(name: string): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value ?? null;
}

export async function setServerCookie(
  name: string,
  value: string,
  options?: {
    expires?: Date;
    path?: string;
    sameSite?: 'lax' | 'strict' | 'none';
    secure?: boolean;
    httpOnly?: boolean;
  }
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    expires:
      options?.expires || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    path: options?.path || '/',
    sameSite: options?.sameSite || 'lax',
    secure: options?.secure,
    httpOnly: options?.httpOnly,
  });
}

export async function deleteServerCookie(name: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}
