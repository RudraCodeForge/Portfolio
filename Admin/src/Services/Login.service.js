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
