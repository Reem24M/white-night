import { Router } from "express";
import { aiChat } from "../controller/ai.controller.js";

const router = Router();

// @route POST /ai/chat
// @access Public
router.post("/chat", aiChat);

export default router;
