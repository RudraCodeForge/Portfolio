const bcrypt = require("bcrypt");
const Admin = require("../../Models/Admin");
const Activity = require("../../Models/Activity");

const sanitizeAdmin = (admin) => ({
  id: admin._id,
  email: admin.email,
  role: admin.role,
  createdAt: admin.createdAt,
});

const validateCredentials = (email, password) =>
  typeof email === "string" &&
  email.trim() &&
  typeof password === "string" &&
  password.length >= 8;

exports.getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.adminId).select(
      "email role createdAt",
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account was not found",
      });
    }

    return res.status(200).json({
      success: true,
      admin: sanitizeAdmin(admin),
    });
  } catch (error) {
    console.error("GET ADMIN PROFILE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin profile",
    });
  }
};

exports.updateProfile = async (req, res) => {
  const { email, password } = req.body;

  if (!validateCredentials(email, password)) {
    return res.status(400).json({
      success: false,
      message:
        "A valid email and password of at least 8 characters are required",
    });
  }

  try {
    const admin = await Admin.findById(req.admin.adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account was not found",
      });
    }

    admin.email = email.trim().toLowerCase();
    admin.password = await bcrypt.hash(password, 10);
    await admin.save();
    await Activity.create({
      title: "Admin password changed",
      description: "Your admin credentials were updated",
      icon: "shield",
      tone: "yellow",
    });

    return res.status(200).json({
      success: true,
      message: "Admin profile updated successfully",
      admin: sanitizeAdmin(admin),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An admin with this email already exists",
      });
    }

    console.error("UPDATE ADMIN PROFILE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update admin profile",
    });
  }
};

exports.createAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!validateCredentials(email, password)) {
    return res.status(400).json({
      success: false,
      message:
        "A valid email and password of at least 8 characters are required",
    });
  }

  try {
    const admin = await Admin.create({
      email: email.trim().toLowerCase(),
      password: await bcrypt.hash(password, 10),
    });
    await Activity.create({
      title: "New admin added",
      description: `${admin.email} was added as an administrator`,
      icon: "shield",
      tone: "mint",
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: sanitizeAdmin(admin),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An admin with this email already exists",
      });
    }

    console.error("CREATE ADMIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create admin",
    });
  }
};
