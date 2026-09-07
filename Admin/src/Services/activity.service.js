import api from "./api.service";

export const getRecentActivities = async () => {
  try {
    const response = await api.get("/admin/activities");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch recent activities",
      }
    );
  }
};
