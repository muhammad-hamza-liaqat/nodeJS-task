const express = require("express");
const userRoutes = express.Router();
const {
  userSignUp,
  userSignIn,
} = require("../controller/userController/userController");

userRoutes.route("/sign-up").post(userSignUp);
userRoutes.route("/login").post(userSignIn);

module.exports = userRoutes;
