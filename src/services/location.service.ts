import { axiosInstanceIdentity } from './axios.config';
import { authStorage } from '@/lib/storage/authStorage';

export type LocationOption = {
  id: number;
  name: string;
};

const getIdentityHeaders = () => {
  const token = authStorage.getAccessToken();
  if (!token) {
    throw new Error('Access token is required for identity calls.');
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const locationService = {
  getProvinces: async () => {
    const response = await axiosInstanceIdentity.get<LocationOption[]>(
      '/api/identity/locations/provinces',
      { headers: getIdentityHeaders() }
    );
    return response.data;
  },

  getCities: async (provinceId: number) => {
    const response = await axiosInstanceIdentity.get<LocationOption[]>(
      `/api/identity/locations/provinces/${provinceId}/cities`,
      { headers: getIdentityHeaders() }
    );
    return response.data;
  },
};
