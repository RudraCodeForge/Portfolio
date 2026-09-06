import { createSlice } from "@reduxjs/toolkit";

const accessToken = localStorage.getItem("accessToken");

const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const encodedPayload = token
      .split(".")[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const payload = JSON.parse(atob(encodedPayload));
    return typeof payload.exp === "number" && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

if (accessToken && !isTokenValid(accessToken)) {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("isVerified");
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: isTokenValid(accessToken) ? accessToken : null,
    isVerified:
      localStorage.getItem("isVerified") === "true" &&
      isTokenValid(accessToken),
  },
  reducers: {
    setVerified: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isVerified = true;
    },
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isVerified");
      state.accessToken = null;
      state.isVerified = false;
    },
  },
});

export const { setVerified, logout } = authSlice.actions;
export default authSlice.reducer;
