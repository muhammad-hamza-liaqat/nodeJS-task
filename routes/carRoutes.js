const express = require("express");
const carRoutes = express.Router();
const {addingCar} = require("../controller/carController/carController")
carRoutes.route("/add-car").get(addingCar);

module.exports = carRoutes;
