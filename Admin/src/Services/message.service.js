import api from "./api.service";

export const GetAdminMessages = async () => {
  try {
    const response = await api.get("/admin/messages");
    return response.data;
  } catch (error) {
    console.error("Error fetching admin messages:", error);
    throw error;
  }
};
