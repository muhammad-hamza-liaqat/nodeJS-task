const express = require("express");
const userRoutes = express.Router();
const { userSignIn} = require("../controller/userController/userController")
userRoutes.route("/sign-in").get(userSignIn)

module.exports = userRoutes