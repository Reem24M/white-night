import { model, Schema } from "mongoose";
const phoneNumberField = /^(01[0125][0-9]{8})$/;
const invalidPhoneMsg = "Phone number must be a valid Egyptian mobile number starting with 010, 011, 012, or 015 and followed by 8 digits.";
const LIMITS = {
  GALLERY_PHOTOS: 20,
  HALL_TYPES: 4
};

const hallSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      trim: true,
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    coverPhoto: {
      url: { type: String, trim: true },
      publicId: { type: String, trim: true },
    },

    numberOfReviews: {
      type: Number,
      min: 0,
      default: 0,
    },

    priceRange: {
      type: String,
      trim: true,
      default: "low",
    },

    facebookLink: {
      type: String,
      trim: true,
    },

    hallType: [
      {
        type: String,
        required: true,
        trim: true,
        enum: ["Hall", "Organization_halls", "Roof", "Photosation"],
      },
    ],

    capacity: {
      type: Number,
      min: 0,
    },

    phoneNumber: {
      type: String,
      trim: true,
      required: true,
      match: [phoneNumberField, invalidPhoneMsg],
    },

    whatsappNumber: {
      type: String,
      trim: true,
      default: null,
      match: [phoneNumberField, invalidPhoneMsg],
    },

    address: {
      governorate: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      street: {
        type: String,
        required: true,
        trim: true,
      },
      details: {
        type: String,
        trim: true,
        default: "",
      },
    },

    Gallery: [
      {
        url: { type: String, required: true, trim: true },
        publicId: { type: String, required: true, trim: true },
      },
    ],

    Owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true },
);

// Custom Validators

hallSchema
  .path("Gallery")
  .validate(
    (gallery) => gallery.length <= LIMITS.GALLERY_PHOTOS,
    `Gallery cannot have more than ${LIMITS.GALLERY_PHOTOS} photos`,
  );

hallSchema
  .path("hallType")
  .validate(
    (types) => types.length <= LIMITS.HALL_TYPES,
    `Cannot add more than ${LIMITS.HALL_TYPES} hall types`,
  );

export const hallModel = model("Hall", hallSchema);
    