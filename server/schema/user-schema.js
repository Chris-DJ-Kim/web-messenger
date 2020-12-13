const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
  },
  email: {
    type: String,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Please enter a valid email.",
    },
  },
  password: {
    type: String,
    required: true,
    min: [6, "Password must be atleast 6 characters in length!"],
  },
});

module.exports = User;
