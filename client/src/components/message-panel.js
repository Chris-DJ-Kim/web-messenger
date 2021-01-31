import React from "react";
import axios from "axios";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import MessageField from "./message-field";
import MessageBubbleContainer from "./message-bubble-container";

const MessagePanel = (props) => {
  const {
    username,
    currentConversation,
    currentConversationRetrievedMessages,
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
  return (
    <Container style={{ height: "80vh" }}>
      <Typography
        variant="h2"
        className="MuiTypography-alignLeft"
        style={{ padding: "1vh" }}
      >
        {currentConversation ? currentConversation.user : ""}
      </Typography>
      <MessageBubbleContainer
        style={{ height: "100%", padding: "0" }}
        username={username}
        currentConversationRetrievedMessages={
          currentConversationRetrievedMessages
        }
        isConnected={isConnected}
        socket={socket}
      />
      <MessageField sendMessage={sendMessage} />
    </Container>
  );
};

export default MessagePanel;
