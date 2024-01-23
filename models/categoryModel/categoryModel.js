const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryType: {
    type: String,
    required: true,
    unique: true,
  },
});

const categoryModel = mongoose.model('categorys', categorySchema);

module.exports = categoryModel;
