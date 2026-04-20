import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 30,
      default: "Review",
    },
    Content: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 500,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    Hall: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Hall",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

// One review per user per hall
reviewSchema.index({ Hall: 1, user: 1 }, { unique: true });

export const reviewModel = model("Review", reviewSchema);
