const express = require("express");
const categoryRoutes = express.Router();
const { addingCategory, editCategory, getAll, deleteCategory } = require("../controller/categoryController/categoryController")

categoryRoutes.route("/add-category").post(addingCategory);
categoryRoutes.route("/edit-category/:id").patch(editCategory);
categoryRoutes.route("/get-category").get(getAll)
categoryRoutes.route("/delete-category/:id").delete(deleteCategory)
module.exports = categoryRoutes