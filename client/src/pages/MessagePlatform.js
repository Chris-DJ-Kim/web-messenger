import React, { useEffect, useState } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";

import MessagePanel from "../components/message-panel";
import ConversationPanel from "../components/conversation-panel.js";

const MessagePlatform = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get("/messages");
        if (response.status === 200) {
          setUsername(response.data.username);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getConversations();
  }, []);

  return (
    <Grid container spacing={0} style={{ height: "100vh" }}>
      <Grid xs={5} sm={4} md={3} item container direction="column">
        <ConversationPanel username={username} />
      </Grid>
      <Grid item xs={7} sm={8} md={9} align="center">
        <MessagePanel username={username} />
      </Grid>
    </Grid>
  );
};

export default MessagePlatform;
