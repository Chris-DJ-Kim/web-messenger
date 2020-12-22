import React from "react";
import axios from "axios";

import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";

import MessageField from "./message-field";
import MessageBubble from "./message-bubble";

const MessagePanel = (props) => {
  const {
    username,
    currentConversation,
    currentConversationMessages,
    setCurrentConversationMessages,
    socket,
    isConnected,
  } = props;

  const sendMessage = async (message) => {
    //Conversation must be chosen and there must also be a message to send
    if (!currentConversation) {
      console.log("Please select a conversation");
    } else if (message) {
      const response = await axios.post("/messages", {
        senderName: username,
        content: message,
        recipientName: currentConversation.user,
      });
      if (response.status === 200) {
        socket.emit("message", {
          sender: username,
          message: message,
          roomId: currentConversation.conversationId,
          createdAt: response.data.createdAt,
          conversationId: response.data.conversationId,
          _id: response.data._id,
        });
      }
    }
  };
  if (isConnected) {
    socket.on("message", (content) => {
      setCurrentConversationMessages([
        ...currentConversationMessages,
        {
          content: content.message,
          sender: content.sender,
          createdAt: content.createdAt,
          conversationId: content.conversationId,
          _id: content._id,
        },
      ]);
    });
  }
  return (
    <Container style={{ height: "100%" }}>
      {currentConversation.user}
      <Container style={{ height: "75%" }}>
        <List
          style={{
            overflow: "auto",
            flexWrap: "nowrap",
            height: "100%",
            padding: "0",
          }}
        >
          {currentConversationMessages.map((msg) => {
            //So that style can be set conditionally on if the message is from the logged in user
            //or is from someone else
            if (msg.sender === username) {
              return (
                <MessageBubble
                  key={msg._id}
                  myMessage={true}
                  message={msg.content}
                />
              );
            }
            return (
              <MessageBubble
                key={msg._id}
                myMessage={false}
                message={msg.content}
              />
            );
          })}
        </List>
      </Container>
      <MessageField sendMessage={sendMessage} />
    </Container>
  );
};

export default MessagePanel;
