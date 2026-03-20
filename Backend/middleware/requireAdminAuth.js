import jwt from "jsonwebtoken";

const getBearerToken = (headerValue = "") => {
  const [scheme, token] = headerValue.split(" ");
  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
};

export const requireAdminAuth = (req, res, next) => {
  const token = getBearerToken(req.headers.authorization);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Admin authorization required",
    });
  }

  if (!process.env.ADMIN_JWT_SECRET) {
    return res.status(500).json({
      success: false,
      message: "ADMIN_JWT_SECRET is not configured",
    });
  }

  try {
    req.admin = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Admin session is invalid or expired",
    });
  }
};
