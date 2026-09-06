const Message = require("../Models/Message");

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
    console.error("GET ADMIN MESSAGES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};
