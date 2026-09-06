const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const authorization = req.headers.authorization || "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    req.admin = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return next();
  } catch {
    return res
      .status(401)
      .json({ success: false, message: "Invalid access token" });
  }
};

module.exports = { requireAuth };
