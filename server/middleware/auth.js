const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : null;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "dev-jwt-secret"
    );
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const authorize = (...roles) => (req, res, next) => {
  if (!req.user?.role) {
    return res.status(401).json({ message: "Authentication required" });
  }
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied for this role" });
  }
  next();
};

module.exports = { auth, authorize };
