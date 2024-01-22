const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // Minimum length of 4 characters
    minlength: 4,
    // Only alphabetic characters and spaces are allowed
    match: /^[a-zA-Z ]*$/,
  },
  email: {
    type: String,
    required: true,
    // Making email field unique
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Validation for exactly 11 numeric characters
        return /^\d{11}$/.test(value);
      },
      message: "Phone number must be exactly 11 numeric characters",
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
