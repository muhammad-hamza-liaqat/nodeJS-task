const express = require("express");
const carRoutes = express.Router();
const {
  addingCar,
  editCar,
  deleteCar,
  allCar,
} = require("../controller/carController/carController");

carRoutes.route("/add-car").post(addingCar);
carRoutes.route("/edit-car/:id").patch(editCar);
carRoutes.route("/delete-car/:id").delete(deleteCar);
carRoutes.route("/get-car").get(allCar);
module.exports = carRoutes;
