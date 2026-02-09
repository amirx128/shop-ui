import { axiosInstanceIdentity } from './axios.config';
import { authStorage } from '@/lib/storage/authStorage';

export type IdentityProfileResponse = {
  userId: string;
  userName: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatarUrl: string;
  defaultAddressId?: string | null;
};

export const identityService = {
  getProfile: async () => {
    const token = authStorage.getAccessToken();
    if (!token) {
      throw new Error('Access token is not available for identity requests.');
    }

    const response = await axiosInstanceIdentity.get<IdentityProfileResponse>(
      '/api/identity/profile',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },
};
