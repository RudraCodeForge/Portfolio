import api from "./api.service";

export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const verifyOtp = async (otpData) => {
  try {
    const response = await api.post("/auth/verify-otp", otpData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "OTP verification failed" };
  }
};

export const resendOtp = async (otpSessionId) => {
  try {
    const response = await api.post("/auth/resend-otp", { otpSessionId });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to resend OTP" };
  }
};
