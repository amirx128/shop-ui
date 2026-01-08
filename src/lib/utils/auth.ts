import { getCookie } from './cookies';
import { getServerCookie } from './cookies.server';

export const getTokenFromCookie = (): string | null => {
  return getCookie('token');
};

export const getTokenFromServerCookie = async (): Promise<string | null> => {
  return await getServerCookie('token');
};
