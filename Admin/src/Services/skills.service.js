import api from "./api.service";

export const createSkill = async (data) => {
  const response = await api.post("/admin/skills", data);
  return response.data;
};

export const updateSkill = async (id, data) => {
  const response = await api.patch(`/admin/skills/${id}`, data);
  return response.data;
};

export const deleteSkill = async (id) => {
  const response = await api.delete(`/admin/skills/${id}`);
  return response.data;
};
