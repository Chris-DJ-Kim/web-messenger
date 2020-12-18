const express = require("express");
const router = express.Router();

const saveMessage = require("../utils/save-message");
const Conversation = require("../models/conversation-model.js");
const User = require("../models/user-model");

router.post("/", async function (req, res) {
  try {
    const { senderName, content, recipientName } = req.body;
    // console.log(req.body)
    saveMessage(senderName, content, recipientName);

    res.status(200).send("Message was saved");
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get("/", async function (req, res) {
  try {
    // console.log(req.user);

    res.status(200).send(req.user);
  } catch (e) {
    res.status(404).send(e);
    console.log(e);
  }
});

module.exports = router;
