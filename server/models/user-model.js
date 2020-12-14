const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unqiue: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    validate: (value) => {
      if (!validator.isEmail(value))
        throw new Error("Please enter a valid email");
    },
  },

  password: {
    type: String,
    required: true,
    validate: (value) => {
      if (value.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
    },
  },
});

userSchema.methods.generateAuthenticationToken = async (user) => {
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN, {
    expiresIn: "1h",
  });
  return token;
};

//Function to find user for login
userSchema.statics.findUser = async (username, password) => {
  const user = await User.findOne({ username: username.toLowerCase() });
  if (!user) {
    throw new Error("Unable to login!");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Unable to login!");
  }
  return user;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 8);

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
