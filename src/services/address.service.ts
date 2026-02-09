import { axiosInstanceIdentity } from './axios.config';
import { authStorage } from '@/lib/storage/authStorage';

export type CustomerAddressDto = {
  id: string;
  provinceId: number;
  cityId: number;
  street: string;
  address: string;
  title: string;
  alley?: string | null;
  plaque?: string | null;
  unit?: string | null;
  location?: string | null;
  createdAtUtc: string;
  modifiedAtUtc?: string | null;
};

export type SaveCustomerAddressRequest = {
  provinceId: number;
  cityId: number;
  street: string;
  address: string;
  title: string;
  alley?: string | null;
  plaque?: string | null;
  unit?: string | null;
  location?: string | null;
};

export const addressService = {
  getAddresses: async () => {
    const response = await axiosInstanceIdentity.get<CustomerAddressDto[]>(
      getUserAddressesPath(),
      { headers: getIdentityHeaders() }
    );
    return response.data;
  },

  createAddress: async (payload: SaveCustomerAddressRequest) => {
    const response = await axiosInstanceIdentity.post<CustomerAddressDto>(
      getUserAddressesPath(),
      payload,
      { headers: getIdentityHeaders() }
    );
    return response.data;
  },

  updateAddress: async (
    addressId: string,
    payload: SaveCustomerAddressRequest
  ) => {
    const response = await axiosInstanceIdentity.put<CustomerAddressDto>(
      getUserAddressesPath(addressId),
      payload,
      { headers: getIdentityHeaders() }
    );
    return response.data;
  },

  setDefaultAddress: async (addressId: string) => {
    await axiosInstanceIdentity.put(
      getUserAddressesPath(addressId, 'default'),
      undefined,
      { headers: getIdentityHeaders() }
    );
  },
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

const getUserAddressesPath = (addressId?: string, suffix?: 'default') => {
  const customerId = authStorage.getCustomerId();
  if (!customerId) {
    throw new Error('Customer ID is missing from storage.');
  }

  const basePath = `/api/identity/users/${customerId}/addresses`;
  if (addressId) {
    return suffix ? `${basePath}/${addressId}/${suffix}` : `${basePath}/${addressId}`;
  }

  return basePath;
};
