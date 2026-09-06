import axios from "axios";
import store from "../Store/store";
import { logout, setVerified } from "../Store/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    const refreshedAccessToken = response.headers["x-access-token"];

    if (refreshedAccessToken) {
      localStorage.setItem("accessToken", refreshedAccessToken);
      localStorage.setItem("isVerified", "true");
      store.dispatch(setVerified({ accessToken: refreshedAccessToken }));
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url || "";
    const isAuthRequest = requestUrl.includes("/auth/");
    const isUnauthorized = [401, 403].includes(error.response?.status);

    if (isUnauthorized && !isAuthRequest && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post("/auth/refresh");
        const { accessToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("isVerified", "true");
        store.dispatch(setVerified({ accessToken }));
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isVerified");
        store.dispatch(logout());
        window.location.assign("/");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
