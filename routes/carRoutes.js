const express = require("express");
const carRoutes = express.Router();

carRoutes.route("/add-car").post(AddCar);

module.exports = carRoutes;
