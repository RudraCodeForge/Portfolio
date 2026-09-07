const express = require("express");
const { requireAuth } = require("../../Middlewares/authMiddleware");
const HeaderController = require("../../Controller/admin/Header.controller");

const HeaderRouter = express.Router();

HeaderRouter.get("/header", requireAuth, HeaderController.getHeader);
HeaderRouter.put("/header", requireAuth, HeaderController.updateHeader);

module.exports = HeaderRouter;
