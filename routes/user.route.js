import express from "express";
import {
  getUser,
  updateUser,
  deleteAccountController,
} from "../controllers/user.controller.js";
import { Protect, restrictToAdminOrAccountOwner } from "../middlewares/auth.js";

const router = express.Router();

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private (Admin)
router.get("/:id", Protect, restrictToAdmin, getUser);

// @desc    Update user by ID
// @route   PUT /api/users/:id
// @access  Private (Admin, Account Owner)
router.put("/:id", Protect, restrictToAdminOrAccountOwner, updateUser);

// @desc    Delete account
// @route   DELETE /api/users/:id
// @access  Private (Admin, Account Owner)
router.delete(
  "/:id",
  Protect,
  restrictToAdminOrAccountOwner,
  deleteAccountController,
);

export default router;
