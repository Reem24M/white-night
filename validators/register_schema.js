import Joi from "joi";

const registerSchema = Joi.object({
  fullname: Joi.string().trim().min(3).max(30).required(),
  phone: Joi.string().trim().pattern(/^01[0125][0-9]{8}$/).required().messages({
    "string.pattern.base": "Phone must be a valid Egyptian number (e.g. 01012345678)",
  }),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password must match password",
  }),
  role: Joi.string().valid("user", "Owner").default("user"),
});

export { registerSchema };
