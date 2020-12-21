import React, { useState } from "react";
import axios from "axios";

import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import MessageBubble from "./message-bubble";

const MessagePanel = (props) => {
  const [message, setMessage] = useState("");
  const {
    username,
    currentConversation,
    currentConversationMessages,
    setCurrentConversationMessages,
    socket,
  } = props;
  const handleChange = (event) => {
    const value = event.target.value;
    setMessage(value);
  };
  const sendMessage = async () => {
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
        });
      }
    }
    setMessage("");
  };
  console.log(currentConversation);
  console.log(currentConversationMessages);
  socket.on("message", (content) => {
    setCurrentConversationMessages([
      ...currentConversationMessages,
      { content: content.message, sender: content.sender },
    ]);
    console.log("later", currentConversationMessages);
  });
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
          {currentConversationMessages.map((msg) => (
            <MessageBubble key={msg._id} message={msg.content} />
          ))}
        </List>
      </Container>
      <Container style={{ textAlign: "right" }}>
        <TextField
          variant="outlined"
          color="primary"
          margin="dense"
          type="text"
          name="message"
          fullWidth
          value={message}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </Container>
    </Container>
  );
};

export default MessagePanel;
