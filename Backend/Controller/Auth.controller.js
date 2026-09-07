const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Admin = require("../Models/Admin");
const AdminOtp = require("../Models/AdminOTP");
const AdminPasswordReset = require("../Models/AdminPasswordReset");
const Activity = require("../Models/Activity");

const {
  sendAdminOtpEmail,
  sendPasswordResetOtpEmail,
} = require("../services/email.service");

const createOtp = () => crypto.randomInt(100000, 1000000).toString();
const hashValue = (value) =>
  crypto.createHash("sha256").update(value).digest("hex");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    });

    const passwordMatches = admin
      ? await bcrypt.compare(password, admin.password)
      : false;

    if (!admin || !passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpHash = await bcrypt.hash(otp, 10);

    await AdminOtp.deleteMany({
      adminId: admin._id,
    });

    const otpRecord = await AdminOtp.create({
      adminId: admin._id,
      otpHash,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      attempts: 0,
    });

    try {
      await sendAdminOtpEmail(admin.email, otp);
    } catch (error) {
      console.error("RESEND ERROR:", error);

      await AdminOtp.deleteOne({
        _id: otpRecord._id,
      });

      return res.status(500).json({
        success: false,
        message: "Failed to send OTP",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otpSessionId: otpRecord._id,
      email: admin.email,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { otpSessionId, otp } = req.body;

    if (!otpSessionId || !otp) {
      return res.status(400).json({
        success: false,
        message: "OTP session ID and OTP are required",
      });
    }

    const adminOtp = await AdminOtp.findById(otpSessionId);

    if (!adminOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP session",
      });
    }

    if (adminOtp.expiresAt <= new Date()) {
      await AdminOtp.deleteOne({
        _id: adminOtp._id,
      });

      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    if (adminOtp.attempts >= 5) {
      await AdminOtp.deleteOne({
        _id: adminOtp._id,
      });

      return res.status(429).json({
        success: false,
        message: "Maximum OTP attempts exceeded",
      });
    }

    const isMatch = await bcrypt.compare(String(otp), adminOtp.otpHash);

    if (!isMatch) {
      adminOtp.attempts += 1;

      if (adminOtp.attempts >= 5) {
        await AdminOtp.deleteOne({
          _id: adminOtp._id,
        });

        return res.status(429).json({
          success: false,
          message: "Maximum OTP attempts exceeded",
        });
      }

      await adminOtp.save();

      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
        attemptsLeft: 5 - adminOtp.attempts,
      });
    }

    const admin = await Admin.findById(adminOtp.adminId).select(
      "_id tokenVersion",
    );

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Admin account was not found",
      });
    }

    const accessToken = jwt.sign(
      {
        adminId: adminOtp.adminId,
        tokenVersion: admin.tokenVersion,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      },
    );
    const refreshToken = jwt.sign(
      {
        adminId: adminOtp.adminId,
        tokenVersion: admin.tokenVersion,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      },
    );

    await AdminOtp.deleteOne({
      _id: adminOtp._id,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      accessToken,
    });
  } catch (error) {
    console.error("OTP verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { otpSessionId } = req.body;

    if (!otpSessionId) {
      return res.status(400).json({
        success: false,
        message: "OTP session ID is required",
      });
    }

    const adminOtp = await AdminOtp.findById(otpSessionId);

    if (!adminOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP session expired. Please sign in again.",
      });
    }

    const admin = await Admin.findById(adminOtp.adminId);

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Admin account was not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    adminOtp.otpHash = await bcrypt.hash(otp, 10);
    adminOtp.expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    adminOtp.attempts = 0;

    await sendAdminOtpEmail(admin.email, otp);
    await adminOtp.save();

    return res.status(200).json({
      success: true,
      message: "OTP resent successfully",
      otpSessionId: adminOtp._id,
    });
  } catch (error) {
    console.error("Resend OTP error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to resend OTP",
    });
  }
};

exports.refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is missing",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const admin = await Admin.findById(decoded.adminId).select(
      "_id tokenVersion",
    );

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin account was not found",
      });
    }

    const accessToken = jwt.sign(
      { adminId: admin._id, tokenVersion: admin.tokenVersion },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" },
    );

    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(401).json({
      success: false,
      message: "Refresh token expired. Please log in again.",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const email =
    typeof req.body.email === "string"
      ? req.body.email.trim().toLowerCase()
      : "";
  const genericResponse = {
    success: true,
    message: "If an account exists, a password reset OTP has been sent.",
  };

  if (!email) return res.status(200).json(genericResponse);

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(200).json(genericResponse);

    const otp = createOtp();
    await AdminPasswordReset.deleteMany({ adminId: admin._id });
    const resetSession = await AdminPasswordReset.create({
      adminId: admin._id,
      otpHash: await bcrypt.hash(otp, 10),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      attempts: 0,
    });

    try {
      await sendPasswordResetOtpEmail(admin.email, otp);
    } catch (error) {
      await AdminPasswordReset.deleteOne({ _id: resetSession._id });
      throw error;
    }

    return res.status(200).json({
      ...genericResponse,
      resetSessionId: resetSession._id,
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    return res.status(200).json(genericResponse);
  }
};

exports.verifyResetOtp = async (req, res) => {
  const { resetSessionId, otp } = req.body;

  if (!resetSessionId || !otp) {
    return res.status(400).json({
      success: false,
      message: "Reset session ID and OTP are required",
    });
  }

  try {
    const resetSession = await AdminPasswordReset.findById(resetSessionId);
    if (
      !resetSession ||
      resetSession.verifiedAt ||
      resetSession.expiresAt <= new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset session",
      });
    }

    if (resetSession.attempts >= 5) {
      await AdminPasswordReset.deleteOne({ _id: resetSession._id });
      return res.status(429).json({
        success: false,
        message: "Maximum OTP attempts exceeded",
      });
    }

    const isMatch = await bcrypt.compare(String(otp), resetSession.otpHash);
    if (!isMatch) {
      resetSession.attempts += 1;
      await resetSession.save();
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
        attemptsLeft: Math.max(0, 5 - resetSession.attempts),
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    resetSession.resetTokenHash = hashValue(resetToken);
    resetSession.verifiedAt = new Date();
    resetSession.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await resetSession.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified. You can now reset your password.",
      resetToken,
    });
  } catch (error) {
    console.error("VERIFY RESET OTP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify reset OTP",
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { resetToken, password, confirmPassword } = req.body;

  if (
    typeof resetToken !== "string" ||
    typeof password !== "string" ||
    password.length < 8
  ) {
    return res.status(400).json({
      success: false,
      message:
        "A reset token and password of at least 8 characters are required",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  try {
    const resetSession = await AdminPasswordReset.findOne({
      resetTokenHash: hashValue(resetToken),
      verifiedAt: { $ne: null },
      expiresAt: { $gt: new Date() },
    });

    if (!resetSession) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    const admin = await Admin.findById(resetSession.adminId);
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Admin account was not found",
      });
    }

    admin.password = await bcrypt.hash(password, 10);
    admin.tokenVersion = (admin.tokenVersion || 0) + 1;
    await admin.save();
    await Activity.create({
      title: "Admin password reset",
      description: "The admin password was reset successfully",
      icon: "shield",
      tone: "yellow",
    });
    await AdminPasswordReset.deleteMany({ adminId: admin._id });
    await AdminOtp.deleteMany({ adminId: admin._id });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. Please log in again.",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
