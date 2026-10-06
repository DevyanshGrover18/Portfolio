import { Router } from "express";
import { getContent, getContentItem, createContent, updateContent, deleteContent } from "../controllers/portfolioContentController.js";
import { requireAdminAuth } from "../middleware/requireAdminAuth.js";

const router = Router();
router.get("/:section", getContent);
router.get("/:section/:id", getContentItem);

export const adminPortfolioContentRouter = Router();
adminPortfolioContentRouter.use(requireAdminAuth);
adminPortfolioContentRouter.get("/:section", getContent);
adminPortfolioContentRouter.get("/:section/:id", getContentItem);
adminPortfolioContentRouter.post("/:section", createContent);
adminPortfolioContentRouter.put("/:section/:id", updateContent);
adminPortfolioContentRouter.delete("/:section/:id", deleteContent);

export default router;
