import api from "./api.service";

export const createProject = async (projectData) => {
  try {
    const response = await api.post("/admin/projects", projectData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to create project",
      }
    );
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const response = await api.patch(
      `/admin/projects/${projectId}`,
      projectData,
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to update project",
      }
    );
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await api.delete(`/admin/projects/${projectId}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to delete project",
      }
    );
  }
};
