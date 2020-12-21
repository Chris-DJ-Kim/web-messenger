import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";

import MessagePanel from "../components/message-panel";
import ConversationPanel from "../components/conversation-panel.js";

const clientIo = require("socket.io-client");
// const socket = clientIo({
//   query: { roomId: currentConversation.conversationId },
// });

const MessagePlatform = () => {
  const [username, setUsername] = useState("");
  const [currentConversation, setCurrentConversation] = useState("");

  const [
    currentConversationMessages,
    setCurrentConversationMessages,
  ] = useState([]);
  //currentConversation is the username of the 'other' user in a conversation
  const socket = clientIo({
    query: { roomId: currentConversation.conversationId },
  });
  return (
    <Grid container spacing={0} style={{ height: "100vh" }}>
      <Grid xs={5} sm={4} md={3} item container direction="column">
        <ConversationPanel
          setCurrentConversation={setCurrentConversation}
          currentConversation={currentConversation}
          username={username}
          setUsername={setUsername}
          setCurrentConversationMessages={setCurrentConversationMessages}
          socket={socket}
        />
      </Grid>
      <Grid item xs={7} sm={8} md={9} align="center">
        <MessagePanel
          currentConversation={currentConversation}
          username={username}
          currentConversationMessages={currentConversationMessages}
          setCurrentConversationMessages={setCurrentConversationMessages}
          socket={socket}
        />
      </Grid>
    </Grid>
  );
};

export default MessagePlatform;
