import api from "./api.service";

const getError = (error, fallback) =>
  error.response?.data || { message: fallback };

export const requestPasswordReset = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw getError(error, "Unable to request a password reset.");
  }
};

export const verifyPasswordResetOtp = async (resetSessionId, otp) => {
  try {
    const response = await api.post("/auth/verify-reset-otp", {
      resetSessionId,
      otp,
    });
    return response.data;
  } catch (error) {
    throw getError(error, "Unable to verify the reset code.");
  }
};

export const resetPassword = async (resetToken, password, confirmPassword) => {
  try {
    const response = await api.post("/auth/reset-password", {
      resetToken,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw getError(error, "Unable to reset the password.");
  }
};
