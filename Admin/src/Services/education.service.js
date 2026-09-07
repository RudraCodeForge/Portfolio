import api from "./api.service";

export const createEducation = async (data) => {
  const response = await api.post("/admin/education", data);
  return response.data;
};

export const updateEducation = async (id, data) => {
  const response = await api.patch(`/admin/education/${id}`, data);
  return response.data;
};

export const deleteEducation = async (id) => {
  const response = await api.delete(`/admin/education/${id}`);
  return response.data;
};
