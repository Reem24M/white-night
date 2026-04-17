import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    Content: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 500,
      required: true,
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
  {
    timestamps: true,
  },
);

reviewSchema.index({ restaurant: 1, user: 1 }, { unique: true });

export const reviewModel = model("Review", reviewSchema);
