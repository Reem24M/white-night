import { Router } from "express";
import {
  getMyNotifications,
  markAllAsRead,
  markAsRead,
  clearNotifications,
} from "../controller/notification.controller.js";
import { Protect } from "../middleware/auth.js";

const router = Router();

router.get("/",               Protect, getMyNotifications);
router.patch("/read-all",     Protect, markAllAsRead);
router.patch("/:id/read",     Protect, markAsRead);
router.delete("/",            Protect, clearNotifications);

export default router;
