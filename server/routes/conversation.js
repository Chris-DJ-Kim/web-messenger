const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Conversation = require("../models/conversation-model.js");
const User = require("../models/user-model");

router.get("/", async (req, res) => {
  try {
    let recipientNames = [];
    //Because asynchronous iterations
    const getNames = async () =>
      await Promise.all(
        req.user.conversations.map(async (conversation) => {
          const result = await Conversation.findOne({ _id: conversation._id });
          const users = await result.users;
          //Trying to compare or filter by _ids would result in really frustrating behaviors
          //Resorted to this terribleness
          //Fix later
          const user1 = await User.findOne({ _id: users[0] });
          const user2 = await User.findOne({ _id: users[1] });
          if (user1.username !== req.user.username) {
            recipientNames.push(user1.username);
          }
          if (user2.username !== req.user.username) {
            recipientNames.push(user2.username);
          }
        })
      );

    await getNames();

    res.status(200).send(recipientNames);
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});

module.exports = router;
