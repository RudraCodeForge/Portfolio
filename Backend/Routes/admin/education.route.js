const express = require("express");
const { requireAuth } = require("../../Middlewares/authMiddleware");
const EducationController = require("../../Controller/admin/Education.controller");

const EducationRouter = express.Router();

EducationRouter.post(
  "/education",
  requireAuth,
  EducationController.createEducation,
);
EducationRouter.patch(
  "/education/:id",
  requireAuth,
  EducationController.updateEducation,
);
EducationRouter.delete(
  "/education/:id",
  requireAuth,
  EducationController.deleteEducation,
);

module.exports = EducationRouter;
