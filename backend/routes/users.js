import express from "express";
import {
  getUsers,
  getCurrentUser,
  updateProfile,
} from "../controllers/usersController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/", authenticateToken, getUsers);
router.get("/current", authenticateToken, getCurrentUser);
router.put("/:id", authenticateToken, updateProfile);

export default router;
