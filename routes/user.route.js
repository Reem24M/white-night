import { Router } from "express";
import { getUser, updateUser, deleteAccountController } from "../controller/user.controller.js";
import { Protect, restrictToAdminOrAccountOwner, restrictToAdmin } from "../middleware/auth.js";

const router = Router();

// @desc  Get user by ID
// @route GET /user/:id
// @access Private (Admin)
router.get("/:id", Protect, restrictToAdmin, getUser);

// @desc  Update user by ID
// @route PUT /user/:id
// @access Private (Admin, Account Owner)
router.put("/:id", Protect, restrictToAdminOrAccountOwner, updateUser);

// @desc  Delete account
// @route DELETE /user/:id
// @access Private (Admin, Account Owner)
router.delete("/:id", Protect, restrictToAdminOrAccountOwner, deleteAccountController);

export default router;
