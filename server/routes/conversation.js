const express = require("express");
const router = express.Router();

const Conversation = require("../models/conversation-model.js");
const User = require("../models/user-model");

//For creating a blank conversation (search result conversation)
router.post("/", async (req, res) => {
  try {
    const { recipientName } = req.body;
    const recipient = await User.findOne({
      username: recipientName,
    });
    const conversation = new Conversation({
      users: [req.user._id, recipient._id],
    });
    await conversation.save();
    res.status(200).send({
      conversationId: conversation._id,
      username: recipientName,
    });
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const conversations = [];
    //Go through conversations that the req.user is involved in and creates an array of the users
    //the req.user has a conversation with
    const getConversations = async () => {
      const involvedConversations = await Conversation.find({
        users: { $in: req.user._id },
      }).populate({ path: "users" });
      involvedConversations.map((conversation) => {
        conversation.users.forEach((user) => {
          if (user.username !== req.user.username) {
            const conversationObject = {};
            conversationObject["conversationId"] = conversation._id;
            conversationObject["username"] = user.username;
            conversations.push(conversationObject);
          }
        });
      });
    };

    await getConversations();
    res
      .status(200)
      .send({ conversations: conversations, username: req.user.username });
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get("/allUsers", async (req, res) => {
  try {
    const allUserNames = [];
    const result = await User.find();
    result.map((user) => allUserNames.push(user.username));
    //Sends list of all usernames representing all registered users
    res.status(200).send(allUserNames);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
