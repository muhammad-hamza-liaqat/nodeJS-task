const express = require("express");
const categoryRoutes = express.Router();
const { addingCategory, editCategory } = require("../controller/categoryController/categoryController")

categoryRoutes.route("/add-category").post(addingCategory);
categoryRoutes.route("/edit-category/:id").post(editCategory);

module.exports = categoryRoutes