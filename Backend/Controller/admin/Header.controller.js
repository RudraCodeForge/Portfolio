const Header = require("../../Models/Header");
const Activity = require("../../Models/Activity");

const getPayload = (body) => ({
  Email: body.Email?.trim() || "",
  Resume: body.Resume?.trim() || "",
  SocialLinks: {
    Github: body.SocialLinks?.Github?.trim() || "",
    Instagram: body.SocialLinks?.Instagram?.trim() || "",
    LinkedIn: body.SocialLinks?.LinkedIn?.trim() || "",
  },
});

const isValid = (body) => {
  const payload = getPayload(body);
  return [
    payload.Email,
    payload.Resume,
    payload.SocialLinks.Github,
    payload.SocialLinks.Instagram,
    payload.SocialLinks.LinkedIn,
  ].every(Boolean);
};

exports.getHeader = async (req, res) => {
  try {
    const header = await Header.findOne();
    return res.status(200).json({ success: true, header });
  } catch (error) {
    console.error("GET HEADER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch header data",
    });
  }
};

exports.updateHeader = async (req, res) => {
  if (!isValid(req.body)) {
    return res.status(400).json({
      success: false,
      message: "Email, resume, and all social links are required",
    });
  }

  try {
    const header = await Header.findOneAndUpdate({}, getPayload(req.body), {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });
    await Activity.create({
      title: "Portfolio header updated",
      description: "Email, resume, or social links were updated",
      icon: "settings",
      tone: "mint",
    });

    return res.status(200).json({
      success: true,
      message: "Header data updated successfully",
      header,
    });
  } catch (error) {
    console.error("UPDATE HEADER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update header data",
    });
  }
};
