const User = require("../models/user-model");
const Conversation = require("../models/conversation-model");
const Message = require("../models/message-model");

const saveMessage = async (senderName, content, recipientName) => {
  const sender = await User.findOne({
    username: senderName,
  });
  const recipient = await User.findOne({
    username: recipientName,
  });
  console.log(senderName, content, recipientName);
  const existingConversation = await Conversation.findOne({
    users: [sender._id, recipient._id],
  });
  console.log("Trying to save message");
  //If this is new conversation
  if (!existingConversation) {
    const conversation = new Conversation({
      users: [sender._id, recipient._id],
    });
    sender.conversations.push(conversation._id);
    recipient.conversations.push(conversation._id);
    //Sender and recipient can be saved at this point
    const message = new Message({
      sender: sender._id,
      content: content,
      conversationId: conversation._id,
    });
    //Message can be saved at this point
    conversation.messages.push(message._id);
    //Conversation can be saved at this point
    await sender.save();
    await recipient.save();
    await message.save();
    await conversation.save();
    return;
  }
  //
  //If conversation already exists
  const message = new Message({
    sender: sender._id,
    content: content,
    conversationId: existingConversation._id,
  });
  existingConversation.messages.push(message._id);
  await message.save();
  await existingConversation.save();
  return;
};

module.exports = saveMessage;
