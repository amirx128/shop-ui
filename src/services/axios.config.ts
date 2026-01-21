import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getCookie } from '@/lib/utils/cookies';
import { defaultLocale } from '@/i18n';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const baseIdentityURL = process.env.NEXT_PUBLIC_IDENTITY_API_URL;

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
const axiosInstanceIdentity = axios.create({
  baseURL: baseIdentityURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosInstanceWithAuth = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstanceWithAuth.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token') || getCookie('token');
        if (token) {
          localStorage.removeItem('token');
          localStorage.removeItem('userRole');
          document.cookie =
            'token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
          document.cookie =
            'userRole=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
          window.location.href = `/${defaultLocale}`;
        }
      }
    }
    return Promise.reject(error);
  }
);

axiosInstanceWithAuth.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token') || getCookie('token');
        if (token) {
          localStorage.removeItem('token');
          localStorage.removeItem('userRole');
          document.cookie =
            'token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
          document.cookie =
            'userRole=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
          window.location.href = `/${defaultLocale}`;
        }
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstanceWithAuth, axiosInstanceIdentity };
export default axiosInstance;
