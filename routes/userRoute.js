const express = require("express");
const userRoutes = express.Router();
const { userSignUp} = require("../controller/userController/userController")
userRoutes.route("/sign-up").post(userSignUp)

module.exports = userRoutes