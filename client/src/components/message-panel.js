import React, { useState, useEffect } from "react";
import axios from "axios";

import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import MessageBubble from "./message-bubble";

import io from "socket.io-client";
const socket = io();

const MessagePanel = (props) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  //Ensures event listener is turned off appropriately
  useEffect(() => {
    socket.on("message", async ({ sender, message }) => {
      console.log(sender, message, props.username);
      if (message) {
        //Saves message to database if it is valid
        const response = await axios.post("/messages", {
          senderName: sender,
          content: message,
          recipientName: props.username,
        });
        console.log(response);
      }
      setChatMessages([...chatMessages, message]);
    });
    return () => {
      socket.off("message");
    };
  }, [chatMessages, props.username]);

  const handleChange = (event) => {
    const value = event.target.value;
    setMessage(value);
  };
  const sendMessage = () => {
    console.log(message);
    if (message) {
      socket.emit("message", { sender: props.username, message: message });
      console.log("emitting to server", props.username, message);
    }
    setMessage("");
  };
  return (
    <Container style={{ height: "100%" }}>
      <Container style={{ height: "75%" }}>
        <List
          style={{
            overflow: "auto",
            flexWrap: "nowrap",
            height: "100%",
            padding: "0",
          }}
        >
          {chatMessages.map((chatmsg) => {
            let i = 0;
            return <MessageBubble key={++i} message={chatmsg} />;
          })}
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
