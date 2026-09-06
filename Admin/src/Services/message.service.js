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

export const GetAdminMessage = async (id) => {
  const response = await api.get(`/admin/messages/${id}`);
  return response.data;
};

export const MarkMessageAsRead = async (id) => {
  try {
    const response = await api.patch(`/admin/messages/${id}/read`);
    return response.data;
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw error;
  }
};

export const MarkAllMessagesAsRead = async () => {
  try {
    const response = await api.patch("/admin/messages/read-all");
    return response.data;
  } catch (error) {
    console.error("Error marking all messages as read:", error);
    throw error;
  }
};

export const DeleteMessage = async (id) => {
  try {
    const response = await api.delete(`/admin/messages/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};

export const DeleteAllMessages = async () => {
  try {
    const response = await api.delete("/admin/messages");
    return response.data;
  } catch (error) {
    console.error("Error deleting all messages:", error);
    throw error;
  }
};
