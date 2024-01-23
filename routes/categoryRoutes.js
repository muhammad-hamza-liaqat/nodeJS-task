const express = require("express");
const categoryRoutes = express.Router();
const { addingCategory } = require("../controller/categoryController/categoryController")

categoryRoutes.route("/add-category").get(addingCategory)

module.exports = categoryRoutes