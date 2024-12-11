import express from "express";
import {
  getRaces,
  getRaceById,
  registerForRace,
  createRace,
  updateRace,
  deleteRace,
} from "../controllers/racesController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { authorizeRole } from "../middleware/authorizeRole.js";

const router = express.Router();

// Define the API endpoint
router.get("/", getRaces);
router.get("/:id", getRaceById);
router.post("/:id/register", authenticateToken, registerForRace);
router.post("/", authenticateToken, authorizeRole("admin"), createRace);
router.put("/:id", authenticateToken, authorizeRole("admin"), updateRace);
router.delete("/:id", authenticateToken, authorizeRole("admin"), deleteRace);
export default router;
