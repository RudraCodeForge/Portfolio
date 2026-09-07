const { sendContactEmail } = require("../services/email.service");
const Message = require("../Models/Message");
const Activity = require("../Models/Activity");

exports.ContactMe = async (req, res) => {
  try {
    console.log("Contact request received:", req.body);
    const { name, email, subject, message } = req.body;

    const savedMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    const response = await Activity.create({
      title: "New contact message received",
      description: `${name} sent you a message`,
      icon: "mail",
      tone: "mint",
    });
    console.log("Activity logged:", response);

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
