import asyncHandler from "express-async-handler";
import { notificationModel } from "../models/Notification.js";

// @desc  Get my notifications
// @route GET /notifications
// @access Private
const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await notificationModel
    .find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .limit(50);

  const unreadCount = await notificationModel.countDocuments({
    user: req.user.id,
    isRead: false,
  });

  res.status(200).json({ notifications, unreadCount });
});

// @desc  Mark all notifications as read
// @route PATCH /notifications/read-all
// @access Private
const markAllAsRead = asyncHandler(async (req, res) => {
  await notificationModel.updateMany(
    { user: req.user.id, isRead: false },
    { isRead: true }
  );
  res.status(200).json({ message: "All notifications marked as read" });
});

// @desc  Mark single notification as read
// @route PATCH /notifications/:id/read
// @access Private
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await notificationModel.findOne({
    _id: req.params.id,
    user: req.user.id,
  });
  if (!notification) return res.status(404).json({ message: "Notification not found" });

  notification.isRead = true;
  await notification.save();

  res.status(200).json({ message: "Notification marked as read" });
});

// @desc  Delete all my notifications
// @route DELETE /notifications
// @access Private
const clearNotifications = asyncHandler(async (req, res) => {
  await notificationModel.deleteMany({ user: req.user.id });
  res.status(200).json({ message: "All notifications cleared" });
});

export { getMyNotifications, markAllAsRead, markAsRead, clearNotifications };
