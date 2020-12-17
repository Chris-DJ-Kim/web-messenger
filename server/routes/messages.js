const express = require("express");
const router = express.Router();

const Message = require("../models/message-model.js");
const Conversation = require("../models/conversation-model.js");
const User = require("../models/user-model");

router.post("/", async function (req, res) {
  try {
    // const user1 = new User({
    //   username: "Chris",
    //   email: "Chris@email.com",
    //   password: "12345678",
    // });
    // const user2 = new User({
    //   username: "Bob",
    //   email: "Bob@email.com",
    //   password: "12345678",
    // });
    // await user1.save();
    // await user2.save();

    // const conversation = new Conversation({
    //   users: [user1._id, user2._id],
    //   place: "Hi",
    // });
    // await conversation.save();

    // const user = await User.findOne({ _id: user1._id });
    // user.conversations.push(conversation._id);
    // await user.save();
    // console.log(user.populated("conversations") == true);
    // User.findOne({ _id: user1._id })
    //   .populate("conversations")
    //   .exec((err, conversations) => {});

    // const result = await User.findOne({ _id: user1._id });
    // console.log(result.conversations[0]);

    // const message = new Message({
    //   sender: user1._id,
    //   content: "Hi there",
    // });
    // await conversation.save();
    // await message.save();
    res.status(200).send("Success!");
  } catch (e) {
    res.status(404).send(e);
    console.log(e);
  }
});

module.exports = router;
