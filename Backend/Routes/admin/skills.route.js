const express = require("express");
const { requireAuth } = require("../../Middlewares/authMiddleware");
const SkillsController = require("../../Controller/admin/Skills.controller");

const SkillsRouter = express.Router();

SkillsRouter.post("/skills", requireAuth, SkillsController.createSkill);
SkillsRouter.patch("/skills/:id", requireAuth, SkillsController.updateSkill);
SkillsRouter.delete("/skills/:id", requireAuth, SkillsController.deleteSkill);

module.exports = SkillsRouter;
