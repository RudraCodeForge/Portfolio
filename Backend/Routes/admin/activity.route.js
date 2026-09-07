const express = require("express");
const { requireAuth } = require("../../Middlewares/authMiddleware");
const ActivityController = require("../../Controller/admin/Activity.controller");

const ActivityRouter = express.Router();

ActivityRouter.get(
  "/activities",
  requireAuth,
  ActivityController.getRecentActivities,
);

module.exports = ActivityRouter;
