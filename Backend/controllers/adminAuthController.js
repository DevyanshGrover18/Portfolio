import jwt from "jsonwebtoken";

const issueToken = () => {
  if (!process.env.ADMIN_JWT_SECRET) {
    throw new Error("ADMIN_JWT_SECRET is not configured");
  }

  return jwt.sign(
    { role: "admin" },
    process.env.ADMIN_JWT_SECRET,
    { expiresIn: process.env.ADMIN_JWT_EXPIRES_IN || "12h" },
  );
};

export const adminLogin = (req, res) => {
  const { pin } = req.body;

  if (!process.env.ADMIN_PIN) {
    return res.status(500).json({
      success: false,
      message: "ADMIN_PIN is not configured",
    });
  }

  if (!pin) {
    return res.status(400).json({
      success: false,
      message: "PIN is required",
    });
  }

  if (pin !== process.env.ADMIN_PIN) {
    return res.status(401).json({
      success: false,
      message: "Invalid admin PIN",
    });
  }

  return res.json({
    success: true,
    data: {
      token: issueToken(),
    },
  });
};

export const verifyAdminSession = (req, res) => {
  return res.json({
    success: true,
    data: {
      authenticated: true,
      admin: req.admin,
    },
  });
};
