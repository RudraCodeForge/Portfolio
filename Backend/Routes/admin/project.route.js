const express = require("express");
const { requireAuth } = require("../../Middlewares/authMiddleware");
const ProjectController = require("../../Controller/admin/Project.controller");

const ProjectRouter = express.Router();

ProjectRouter.post("/projects", requireAuth, ProjectController.createProject);
ProjectRouter.patch(
  "/projects/:id",
  requireAuth,
  ProjectController.updateProject,
);
ProjectRouter.delete(
  "/projects/:id",
  requireAuth,
  ProjectController.deleteProject,
);

module.exports = ProjectRouter;
