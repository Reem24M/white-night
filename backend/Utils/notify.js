import { notificationModel } from "../models/Notification.js";

/**
 * Create a notification for a user
 * @param {Object} options
 * @param {String} options.userId
 * @param {String} options.type
 * @param {String} options.message
 * @param {String} [options.relatedBooking]
 * @param {String} [options.relatedHall]
 */
export const createNotification = async ({ userId, type, message, relatedBooking, relatedHall }) => {
  try {
    await notificationModel.create({
      user: userId,
      type,
      message,
      relatedBooking: relatedBooking || null,
      relatedHall:    relatedHall    || null,
    });
  } catch (err) {
    // Notifications should never break the main flow
    console.error("Notification error:", err.message);
  }
};
