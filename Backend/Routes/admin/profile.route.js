const express = require("express");
const { requireAuth } = require("../../Middlewares/authMiddleware");
const ProfileController = require("../../Controller/admin/Profile.controller");

const ProfileRouter = express.Router();

ProfileRouter.get("/profile", requireAuth, ProfileController.getProfile);
ProfileRouter.patch("/profile", requireAuth, ProfileController.updateProfile);
ProfileRouter.post(
  "/profile/admins",
  requireAuth,
  ProfileController.createAdmin,
);

module.exports = ProfileRouter;
