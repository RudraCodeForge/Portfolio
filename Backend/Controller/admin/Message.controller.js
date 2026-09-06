const Message = require("../../Models/Message");

exports.GetAdminMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).lean();

    return res.status(200).json({
      success: true,
      messages: messages.map((message) => ({
        ...message,
        id: message._id.toString(),
      })),
    });
  } catch (error) {
    console.error("Error fetching admin messages:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin messages",
    });
  }
};

exports.GetAdminMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).lean();

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: { ...message, id: message._id.toString() },
    });
  } catch (error) {
    console.error("GET ADMIN MESSAGE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch message",
    });
  }
};

exports.MarkMessageAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true, runValidators: true },
    ).lean();

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: { ...message, id: message._id.toString() },
    });
  } catch (error) {
    console.error("MARK MESSAGE READ ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to mark message as read",
    });
  }
};

exports.MarkAllMessagesAsRead = async (req, res) => {
  try {
    const result = await Message.updateMany(
      { isRead: false },
      { $set: { isRead: true } },
    );

    return res.status(200).json({
      success: true,
      message: "All messages marked as read",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("MARK ALL MESSAGES READ ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to mark all messages as read",
    });
  }
};

exports.DeleteMessage = async (req, res) => {
  try {
    const result = await Message.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
      id: req.params.id,
    });
  } catch (error) {
    console.error("DELETE MESSAGE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete message",
    });
  }
};

exports.DeleteAllMessages = async (req, res) => {
  try {
    const result = await Message.deleteMany({});

    return res.status(200).json({
      success: true,
      message: "All messages deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("DELETE ALL MESSAGES ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete all messages",
    });
  }
};
