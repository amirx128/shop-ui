import API_ENDPOINTS from './api.endpoints';
import { axiosInstanceIdentity } from './axios.config';

interface LoginRequest {
  phoneNumber: string;
  code: string;
}
interface RequestOtpRequest {
  phoneNumber: string;
}
interface LastOtpResponse {
  phoneNumber: string;
  code: string;
  message: string;
  sentAtUtc: string;
}

export const authService = {
  loginOtp: async (data: LoginRequest): Promise<any> => {
    const response = await axiosInstanceIdentity.post<any>(
      API_ENDPOINTS.LOGIN_OTP,
      data
    );
    return {
      ...response.data,
    };
  },

  requestOtp: async (data: RequestOtpRequest): Promise<any> => {
    const response = await axiosInstanceIdentity.post<any>(
      API_ENDPOINTS.REQUEST_OTP,
      data
    );
    return response.data;
  },

  getLastOtp: async (): Promise<LastOtpResponse> => {
    const response = await axiosInstanceIdentity.get<LastOtpResponse>(
      API_ENDPOINTS.LAST_OTP
    );
    return response.data;
  },
};
