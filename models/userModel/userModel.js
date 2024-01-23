const Joi = require("joi");
const mongoose = require("mongoose");

// user Mongoose schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    // only alphabetic allowed
    match: /^[a-zA-Z ]*$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{11}$/.test(value);
      },
      message: "Phone number must be exactly 11 numeric characters",
    },
  },
  password: {
    type: String,
    required: false,
  },
});

const userModel = mongoose.model("users", userSchema);

const userJoiSchema = Joi.object({
  name: Joi.string()
    .min(4)
    .pattern(/^[a-zA-Z ]*$/)
    .required(),
  email: Joi.string()
    .email()
    .required()
    .custom((value, helpers) => {
      // only gmail and hotmail are allowes
      const allowedDomains = ["gmail.com", "hotmail.com"];
      const domain = value.split("@")[1];
      if (!allowedDomains.includes(domain)) {
        return helpers.error("any.invalid");
      }
      return value;
    }),
  phoneNumber: Joi.string()
    .pattern(/^\d{11}$/)
    .required()
    .custom((value, helpers) => {
      // only numeric allowed
      if (!/^\d+$/.test(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }),
  password: Joi.string().allow('').optional(),
});

// Validate using Joi before saving to the database
function validateUser(user) {
  try {
    return userJoiSchema.validate(user);
  } catch (error) {
    throw new Error(error.details[0].message);
  }
}

module.exports = { userModel, validateUser };
