const express = require("express");
const { requireAuth } = require("../../Middlewares/authMiddleware");

const MessageRouter = express.Router();

const MessageController = require("../../Controller/admin/Message.controller");

MessageRouter.get("/messages", requireAuth, MessageController.GetAdminMessages);

module.exports = MessageRouter;
