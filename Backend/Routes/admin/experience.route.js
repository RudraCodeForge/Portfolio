const express = require("express");
const { requireAuth } = require("../../Middlewares/authMiddleware");
const ExperienceController = require("../../Controller/admin/Experience.controller");

const ExperienceRouter = express.Router();

ExperienceRouter.post(
  "/experience",
  requireAuth,
  ExperienceController.createExperience,
);
ExperienceRouter.patch(
  "/experience/:id",
  requireAuth,
  ExperienceController.updateExperience,
);
ExperienceRouter.delete(
  "/experience/:id",
  requireAuth,
  ExperienceController.deleteExperience,
);

module.exports = ExperienceRouter;
