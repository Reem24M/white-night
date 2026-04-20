import { Router } from "express";
import {
  getAllHalls,
  getHallById,
  createHall,
  updateHall,
  deleteHall,
  getOwnerDashboard,
} from "../controller/hall.controller.js";
import { Protect } from "../middleware/auth.js";

const router = Router();

// Public
router.get("/",          getAllHalls);
router.get("/:id",       getHallById);

// Owner dashboard  ⚠️ must be before /:id
router.get("/dashboard/me", Protect, getOwnerDashboard);

// Private
router.post("/",         Protect, createHall);
router.put("/:id",       Protect, updateHall);
router.delete("/:id",    Protect, deleteHall);

export default router;
