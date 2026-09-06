const express = require("express");
const ThemeController = require("../Controller/Theme.controller");
const { requireAuth } = require("../Middlewares/authMiddleware");

const ThemeRouter = express.Router();

ThemeRouter.get("/", ThemeController.getTheme);
ThemeRouter.put("/", requireAuth, ThemeController.updateTheme);

module.exports = ThemeRouter;
