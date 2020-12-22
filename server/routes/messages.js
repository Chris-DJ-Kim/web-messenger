const express = require("express");
const router = express.Router();

const saveMessage = require("../utils/save-message");
const Conversation = require("../models/conversation-model.js");
const User = require("../models/user-model");

const findConversation = require("../utils/find-conversation");

// const io = require("../client");
// const { clientIo, port } = io;

router.post("/", async function (req, res) {
  //At this point the user should be authenticated by auth middleware
  try {
    const { content, recipientName } = req.body;

    // const userTalkingTo = await User.findOne({ username: recipientName });
    const message = await saveMessage(req.user._id, content, recipientName);
    // //saveMessage must be before the the below
    // const conversation = await findConversation(
    //   req.user._id,
    //   userTalkingTo._id
    // );
    // // const socket = clientIo.connect(port, {
    // //   reconnect: true,
    // //   query: { roomId: conversation._id },
    // // });
    // // socket.on("connect", function () {
    // //   console.log("connected2");
    // // });
    res.status(200).send(message);
  } catch (e) {
    res.status(404).send(e);
  }
});

//Gets all messages for a given conversation
router.get("/", async function (req, res) {
  //At this point the user should be authenticated by auth middleware
  try {
    const { conversationId } = req.query;
    //Checks if there is a conversation that exists
    const conversationExists = await Conversation.exists({
      _id: conversationId,
    });
    //"Gets" messages only if the conversation existed
    if (conversationExists) {
      const getMessages = async () => {
        const conversation = await Conversation.findOne({
          _id: conversationId,
        }).populate({ path: "messages", populate: { path: "sender" } });
        const messages = conversation.messages;
        messages.sort(function compare(a, b) {
          var dateA = new Date(a.date);
          var dateB = new Date(b.date);
          return dateA - dateB;
        });
        return res.status(200).send(messages);
      };
      await getMessages();
    }

    // console.log(req.user);
    //Client expects an array
    if (!conversationExists) {
      return res.status(200).send([]);
    }
  } catch (e) {
    res.status(404).send(e);
    console.log(e);
  }
});

module.exports = router;
