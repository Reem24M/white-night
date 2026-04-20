import { Schema, model } from "mongoose";

const favHallSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    hall: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Hall",
    },
  },
  { timestamps: true }
);

// Prevent duplicate favorites
favHallSchema.index({ user: 1, hall: 1 }, { unique: true });

export const favHallModel = model("FavHall", favHallSchema);
