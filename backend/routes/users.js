import express from "express";
import {
  getUsers,
  getProfile,
  updateProfile,
} from "../controllers/usersController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/", authenticateToken, getUsers);
router.get("/:id", authenticateToken, getProfile);
router.put("/:id", authenticateToken, updateProfile);

export default router;
