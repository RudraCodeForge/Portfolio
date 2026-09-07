import api from "./api.service";

const getError = (error, fallback) =>
  error.response?.data || { message: fallback };

export const getAdminProfile = async () => {
  try {
    const response = await api.get("/admin/profile");
    return response.data;
  } catch (error) {
    throw getError(error, "Failed to fetch admin profile");
  }
};

export const updateAdminProfile = async (data) => {
  try {
    const response = await api.patch("/admin/profile", data);
    return response.data;
  } catch (error) {
    throw getError(error, "Failed to update admin profile");
  }
};

export const createAdmin = async (data) => {
  try {
    const response = await api.post("/admin/profile/admins", data);
    return response.data;
  } catch (error) {
    throw getError(error, "Failed to create admin");
  }
};

export const getHeader = async () => {
  try {
    const response = await api.get("/admin/header");
    return response.data;
  } catch (error) {
    throw getError(error, "Failed to fetch header data");
  }
};

export const updateHeader = async (data) => {
  try {
    const response = await api.put("/admin/header", data);
    return response.data;
  } catch (error) {
    throw getError(error, "Failed to update header data");
  }
};
