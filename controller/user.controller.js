import asyncHandler from "express-async-handler";
import { Users } from "../models/user.js";
import { hallModel } from "../models/Hall.js";
import { reviewModel } from "../models/reviews.js";

// @desc  Get all users
// @route GET /user
// @access Private (Admin)
const getAllUsers = asyncHandler(async (req, res) => {
  const { role, page = 1, limit = 20 } = req.query;

  const filter = {};
  if (role) filter.role = role;

  const skip = (Number(page) - 1) * Number(limit);

  const [users, total] = await Promise.all([
    Users.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Users.countDocuments(filter),
  ]);

  res.status(200).json({
    users,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
  });
});

// @desc  Get my profile
// @route GET /user/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
});

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
  if (req.user.role !== "admin") {
    delete req.body.role;
    delete req.body.password;
    delete req.body.ownerStatus;
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

  if (currentUser.role === "Owner" && id !== currentUser.id)
    return res.status(403).json({ message: "Not authorized" });

  const targetId = currentUser.role === "admin" && id ? id : currentUser.id;

  const userToDelete = await Users.findById(targetId);
  if (!userToDelete) return res.status(404).json({ message: "User not found" });

  if (userToDelete.role === "admin") {
    const adminCount = await Users.countDocuments({ role: "admin" });
    if (adminCount <= 1)
      return res
        .status(400)
        .json({ message: "Cannot delete the last admin account" });
  }

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

  res
    .status(200)
    .json({ message: "Account and related data deleted successfully" });
});

export { getAllUsers, getMe, getUser, updateUser, deleteAccountController };