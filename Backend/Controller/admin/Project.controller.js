const Project = require("../../Models/Project");

const getProjectPayload = (body) => ({
  ProjectImage: body.ProjectImage?.trim() || "",
  LiveLink: body.LiveLink?.trim() || "",
  Category: body.Category.trim(),
  Note: body.Note?.trim() || "",
  Title: body.Title.trim(),
  Description: body.Description.trim(),
  TechStack: Array.isArray(body.TechStack)
    ? body.TechStack.map((technology) => String(technology).trim()).filter(
        Boolean,
      )
    : String(body.TechStack || "")
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean),
});

const validateProjectData = ({ Title, Category, Description }) =>
  Title?.trim() && Category?.trim() && Description?.trim();

exports.createProject = async (req, res) => {
  try {
    const { Title, Category, Description } = req.body;

    if (!validateProjectData({ Title, Category, Description })) {
      return res.status(400).json({
        success: false,
        message: "Title, category, and description are required",
      });
    }

    const project = await Project.create(getProjectPayload(req.body));

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { Title, Category, Description } = req.body;

    if (!validateProjectData({ Title, Category, Description })) {
      return res.status(400).json({
        success: false,
        message: "Title, category, and description are required",
      });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      getProjectPayload(req.body),
      { new: true, runValidators: true },
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      projectId: project._id,
    });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};
