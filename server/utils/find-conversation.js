const Conversation = require("../models/conversation-model.js");

const findConversation = async (id1, id2) => {
  const conversation = await Conversation.findOne({
    users: { $all: [id1, id2] },
  });
  return conversation;
};

module.exports = findConversation;
