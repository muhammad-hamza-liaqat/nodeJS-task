const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
  categoryType: {
    type: String,
    required: true,
    unique: true,
  },
});

const categoryModel = mongoose.model("categorys", categorySchema);

// Add Joi validation schema
const categoryValidationSchema = Joi.object({
  categoryType: Joi.string()
    .min(3)
    .required()
    .regex(/^[a-zA-Z]+$/, { name: "letters" })
    .messages({
      "string.min": "Category type should have at least 3 characters",
      "any.required": "Category type is required",
      "string.pattern.base": "Category type should only contain letters",
    }),
});

module.exports = { categoryModel, categoryValidationSchema };
