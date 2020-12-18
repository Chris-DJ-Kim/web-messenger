const express = require("express");
const router = express.Router();

const User = require("../models/user-model");

router.post("/", async function (req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.verifyUser(username, password);
    const token = await user.generateAuthenticationToken(user);
    //Also sends authentication cookie that lasts 4 hours
    res
      .status(200)
      .cookie("authToken", token, {
        expires: new Date(Date.now() + 14400000),
        httpOnly: true,
      })
      .send(user);
  } catch (e) {
    res.status(400).send({ errorMessage: e.message });
  }
});

module.exports = router;
