const bcrypt = require("bcrypt");

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
