import { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    hall: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Hall",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventType: {
      type: String,
      trim: true,
      required: true,
      enum: ["Foto Session", "Graduation Party", "Wedding", "Engagement"],
    },
    guestsCount: {
      type: Number,
      min: 1,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      min: 0,
    },
    contactPhone: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true },
);

export const bookingModel = model("Booking", bookingSchema);
