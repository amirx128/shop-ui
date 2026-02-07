import { axiosInstanceIdentity } from './axios.config';

export type IdentityProfileResponse = {
  userId: string;
  userName: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatarUrl: string;
};

export const identityService = {
  getProfile: async (accessToken: string) => {
    if (!accessToken) {
      throw new Error('Access token is required to fetch the identity profile.');
    }

    const response = await axiosInstanceIdentity.get<IdentityProfileResponse>(
      '/api/identity/profile',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  },
};
