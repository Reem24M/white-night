import { Schema, model } from 'mongoose';
import { phoneNumberField, invalidPhoneMsg } from '../Utils/Schema-patterns.js';
import { HallTypes, PriceRanges, LIMITS } from '../Utils/Constants.js';

const ownerRequestSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    // Hall data submitted by the pending owner
    name: {
      type: String,
      trim: true,
      minlength: LIMITS.NAME_MIN,
      maxlength: LIMITS.NAME_MAX,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      minlength: LIMITS.DESCRIPTION_MIN,
      maxlength: LIMITS.DESCRIPTION_MAX,
    },

    coverPhoto: {
      url: { type: String, trim: true },
      publicId: { type: String, trim: true },
    },

    Gallery: [
      {
        url:      { type: String, required: true, trim: true },
        publicId: { type: String, required: true, trim: true },
      },
    ],

    priceRange: {
      type: String,
      enum: PriceRanges,
      default: 'low',
    },

    facebookLink: {
      type: String,
      trim: true,
    },

    hallType: [
      {
        type: String,
        trim: true,
        enum: HallTypes,
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
      governorate: { type: String, required: true, trim: true },
      city:        { type: String, required: true, trim: true },
      street:      { type: String, required: true, trim: true },
      details:     { type: String, trim: true, default: '' },
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const ownerRequestModel = model('OwnerRequest', ownerRequestSchema);
