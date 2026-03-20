import { Router } from "express";
import {
  adminLogin,
  verifyAdminSession,
} from "../controllers/adminAuthController.js";
import { requireAdminAuth } from "../middleware/requireAdminAuth.js";

const router = Router();

router.post("/login", adminLogin);
router.get("/verify", requireAdminAuth, verifyAdminSession);

export default router;
