import { Router } from "express";
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { requireAdminAuth } from "../middleware/requireAdminAuth.js";
import { validatePost } from "../middleware/validatePost.js";

const router = Router();

router.use(requireAdminAuth);

router.get("/", getAllPosts);
router.get("/:id", getPost);
router.post("/", validatePost, createPost);
router.put("/:id", validatePost, updatePost);
router.delete("/:id", deletePost);

export default router;
