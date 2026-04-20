import joi from "joi";
import { emailField, phoneNumberField } from "../Utils/Schema-patterns.js";
import { HallTypes, PriceRanges, LIMITS } from "../Utils/Constants.js";

const createHallValidation = (obj) => {
  const schema = joi.object({
    email: joi.string().trim().pattern(emailField).required(),
    name: joi.string().trim().min(LIMITS.NAME_MIN).max(LIMITS.NAME_MAX).required(),
    description: joi.string().trim().min(LIMITS.DESCRIPTION_MIN).max(LIMITS.DESCRIPTION_MAX).allow(""),
    phoneNumber: joi.string().trim().pattern(phoneNumberField).required(),
    whatsappNumber: joi.string().trim().pattern(phoneNumberField).allow(null, ""),
    facebookLink: joi.string().uri().allow(null, ""),
    hallType: joi.array().items(joi.string().valid(...HallTypes)).min(1).required(),
    priceRange: joi.string().valid(...PriceRanges).default("low"),
    capacity: joi.number().min(1),
    address: joi.object({
      governorate: joi.string().required(),
      city: joi.string().required(),
      street: joi.string().required(),
      details: joi.string().allow("").default(""),
    }).required(),
    coverPhoto: joi.any().messages({
      "any.required": "Cover image is required",
    }),
  });

  return schema.validate(obj, { convert: true, stripUnknown: true });
};

const addReviewValidation = (obj) => {
  const schema = joi.object({
    title: joi.string().trim().min(3).max(30).default("Review"),
    Content: joi.string().trim().min(5).max(500).required(),
  });
  return schema.validate(obj);
};

export { createHallValidation, addReviewValidation };
