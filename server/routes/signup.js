const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user-model");

router.post("/", async function (req, res, next) {
  const { username, email, password } = req.body;
  const user = new User({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password: password,
  });
  try {
    //Checks if a user with same username or email already exists
    //Because unique is not a validator in mongoose
    const usernameExists = await User.exists({
      username: username.toLowerCase(),
    });
    const emailExists = await User.exists({
      email: email.toLowerCase(),
    });
    //Prob can make function of this later
    if (usernameExists) {
      return res
        .status(401)
        .send({ errorMessage: "Sorry, the username is already in use." });
    }
    if (emailExists) {
      return res
        .status(401)
        .send({ errorMessage: "Sorry, the email is already in use." });
    }

    //Only runs if no duplicate user exists

    await user.save();
    res.status(201).send(user);
  } catch (e) {
    if (e.message) {
      return res.status(400).send({ errorMessage: e.message });
    }
    return res.status(400).send(e);
  }
});

module.exports = router;
