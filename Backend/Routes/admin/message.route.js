const express = require("express");
const { requireAuth } = require("../../Middlewares/authMiddleware");

const MessageRouter = express.Router();

const MessageController = require("../../Controller/admin/Message.controller");

MessageRouter.get("/messages", requireAuth, MessageController.GetAdminMessages);
MessageRouter.get(
  "/messages/:id",
  requireAuth,
  MessageController.GetAdminMessage,
);
MessageRouter.patch(
  "/messages/read-all",
  requireAuth,
  MessageController.MarkAllMessagesAsRead,
);
MessageRouter.patch(
  "/messages/:id/read",
  requireAuth,
  MessageController.MarkMessageAsRead,
);
MessageRouter.delete(
  "/messages",
  requireAuth,
  MessageController.DeleteAllMessages,
);
MessageRouter.delete(
  "/messages/:id",
  requireAuth,
  MessageController.DeleteMessage,
);

module.exports = MessageRouter;
