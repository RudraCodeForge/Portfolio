import api from "./api.service";

export const createExperience = async (data) => {
  const response = await api.post("/admin/experience", data);
  return response.data;
};

export const updateExperience = async (id, data) => {
  const response = await api.patch(`/admin/experience/${id}`, data);
  return response.data;
};

export const deleteExperience = async (id) => {
  const response = await api.delete(`/admin/experience/${id}`);
  return response.data;
};
