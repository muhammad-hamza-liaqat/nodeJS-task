const express = require("express");
const categoryRoutes = express.Router();

categoryRoutes.route("/add-category").post(addingCategory)

module.exports = categoryRoutes