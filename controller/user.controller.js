import asyncHandler from "express-async-handler";
import { Users } from "../models/user.js";
import { hallModel } from "../models/Hall.js";
import { reviewModel } from "../models/reviews.js";

// @desc  Get user by ID
// @route GET /user/:id
// @access Private (Admin)
const getUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
});

// @desc  Update user by ID
// @route PUT /user/:id
// @access Private (Admin, Account Owner)
const updateUser = asyncHandler(async (req, res) => {
  // Prevent role escalation by non-admins
  if (req.user.role !== "admin") {
    delete req.body.role;
    delete req.body.password;
  }

  const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
});

// @desc  Delete account and related data
// @route DELETE /user/:id
// @access Private (Admin, Account Owner)
const deleteAccountController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const currentUser = req.user;

  const targetId = currentUser.role === "admin" && id ? id : currentUser.id;

  const userToDelete = await Users.findById(targetId);
  if (!userToDelete) return res.status(404).json({ message: "User not found" });

  // Prevent deleting last admin
  if (userToDelete.role === "admin") {
    const adminCount = await Users.countDocuments({ role: "admin" });
    if (adminCount <= 1)
      return res.status(400).json({ message: "Cannot delete the last admin account" });
  }

  // If owner, delete their hall and its reviews
  if (["admin", "Owner"].includes(userToDelete.role)) {
    const hall = await hallModel.findOne({ Owner: targetId });
    if (hall) {
      await Promise.all([
        reviewModel.deleteMany({ Hall: hall._id }),
        hallModel.deleteOne({ _id: hall._id }),
      ]);
    }
  }

  await Users.findByIdAndDelete(targetId);

  res.status(200).json({ message: "Account and related data deleted successfully" });
});

export { getUser, updateUser, deleteAccountController };
