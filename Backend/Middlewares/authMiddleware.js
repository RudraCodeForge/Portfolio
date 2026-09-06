const jwt = require("jsonwebtoken");
const Admin = require("../Models/Admin");

const createAccessToken = (adminId) =>
  jwt.sign({ adminId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

const requireAuth = async (req, res, next) => {
  const authorization = req.headers.authorization || "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;

  try {
    if (token) {
      req.admin = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      return next();
    }
  } catch (error) {
    console.error("Token verification error:", error);
  }

  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const admin = await Admin.findById(decoded.adminId).select("_id");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin account was not found",
      });
    }

    const accessToken = createAccessToken(admin._id);
    req.admin = { adminId: admin._id.toString() };
    res.setHeader("X-Access-Token", accessToken);
    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Session expired. Please log in again.",
    });
  }
};

module.exports = { requireAuth };
