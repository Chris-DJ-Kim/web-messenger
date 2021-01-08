import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";

import MessagePanel from "./message-panel";
import ConversationPanel from "./conversation-panel.js";

const MessagePlatform = (props) => {
  const {
    socket,
    isConnected,
    currentConversation,
    setCurrentConversation,
  } = props;
  const [username, setUsername] = useState("");
  const [
    currentConversationRetrievedMessages,
    setCurrentConversationRetrievedMessages,
  ] = useState([]);

  //currentConversation is the username of the 'other' user in a conversation
  return (
    <Grid container spacing={0} style={{ height: "100vh" }}>
      <Grid xs={5} sm={4} md={3} item container direction="column">
        <ConversationPanel
          setCurrentConversation={setCurrentConversation}
          currentConversation={currentConversation}
          username={username}
          setUsername={setUsername}
          setCurrentConversationRetrievedMessages={
            setCurrentConversationRetrievedMessages
          }
          socket={socket}
        />
      </Grid>
      <Grid item xs={7} sm={8} md={9} align="center">
        <MessagePanel
          currentConversation={currentConversation}
          username={username}
          currentConversationRetrievedMessages={
            currentConversationRetrievedMessages
          }
          isConnected={isConnected}
          socket={socket}
        />
      </Grid>
    </Grid>
  );
};

export default MessagePlatform;
