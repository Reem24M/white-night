import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
      enum: [
        "booking_confirmed",   // owner confirmed booking
        "booking_cancelled",   // owner/user cancelled booking
        "booking_received",    // owner: new booking came in
        "review_added",        // owner: got a new review
        "owner_request_received", // admin: new owner request
        "owner_approved",      // user: request approved
        "owner_rejected",      // user: request rejected
      ],
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    relatedBooking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
    relatedHall: {
      type: Schema.Types.ObjectId,
      ref: "Hall",
      default: null,
    },
  },
  { timestamps: true }
);

export const notificationModel = model("Notification", notificationSchema);
