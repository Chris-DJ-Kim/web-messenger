const User = require("../models/user-model");
const Conversation = require("../models/conversation-model");
const Message = require("../models/message-model");

const saveMessage = async (senderId, content, recipientName) => {
  //We just need the id from the recipient

  const recipient = await User.findOne({
    username: recipientName,
  });

  const existingConversation = await Conversation.findOne({
    users: {
      $all: [senderId, recipient._id],
    },
  });

  //If this is new conversation
  if (!existingConversation) {
    const conversation = new Conversation({
      users: [senderId, recipient._id],
    });
    //In the case this is a new conversation from a search result

    const message = new Message({
      sender: senderId,
      content: content,
      conversationId: conversation._id,
    });
    //Message can be saved at this point
    conversation.messages.push(message._id);
    //Conversation can be saved at this point
    await message.save();

    await conversation.save();
    return;
  }
  //
  //If conversation already exists
  const message = new Message({
    sender: senderId,
    content: content,
    conversationId: existingConversation._id,
  });
  existingConversation.messages.push(message._id);
  await message.save();
  await existingConversation.save();
  return message;
};

module.exports = saveMessage;
