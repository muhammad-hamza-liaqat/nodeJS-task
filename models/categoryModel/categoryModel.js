const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
  categoryType: {
    type: String,
    required: true,
    unique: true,
  },
});

const categoryModel = mongoose.model('categorys', categorySchema);

// Add Joi validation schema
const categoryValidationSchema = Joi.object({
  categoryType: Joi.string()
    .min(3)
    .required()
    .regex(/^[a-zA-Z]+$/, { name: 'letters' })
    .error((errors) => {
      // Custom error messages
      return errors.map((error) => {
        switch (error.code) {
          case 'string.min':
            return { message: 'Category type should have at least 3 characters' };
          case 'any.required':
            return { message: 'Category type is required' };
          case 'string.pattern.base':
            return { message: 'Category type should only contain letters' };
          default:
            return { message: 'Invalid category type' };
        }
      });
    }),
});

module.exports = { categoryModel, categoryValidationSchema };
