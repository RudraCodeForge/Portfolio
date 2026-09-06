const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/Admin");
const AdminOtp = require("../Models/AdminOTP");

const { sendAdminOtpEmail } = require("../services/email.service");

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

    const accessToken = jwt.sign(
      {
        adminId: adminOtp.adminId,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      },
    );
    const refreshToken = jwt.sign(
      {
        adminId: adminOtp.adminId,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      },
    );

    await AdminOtp.deleteOne({
      _id: adminOtp._id,
    });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      accessToken,
      refreshToken,
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
