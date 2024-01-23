const express = require("express");
const categoryRoutes = express.Router();
const { addingCategory, editCategory, getAll } = require("../controller/categoryController/categoryController")

categoryRoutes.route("/add-category").post(addingCategory);
categoryRoutes.route("/edit-category/:id").patch(editCategory);
categoryRoutes.route("/get-category").get(getAll)

module.exports = categoryRoutes