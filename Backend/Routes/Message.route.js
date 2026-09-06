const express = require("express");
const { requireAuth } = require("../Middlewares/authMiddleware");
const MessageController = require("../Controller/Message.controller");

const MessageRouter = express.Router();

MessageRouter.get("/", requireAuth, MessageController.GetAdminMessages);

module.exports = MessageRouter;
