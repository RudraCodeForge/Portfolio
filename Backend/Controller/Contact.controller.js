const { sendContactEmail } = require("../services/email.service");
const Message = require("../Models/Message");

exports.ContactMe = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const savedMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    const data = await sendContactEmail({
      name,
      email,
      subject,
      message,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      id: data?.id,
    });
  } catch (error) {
    console.error("CONTACT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};
