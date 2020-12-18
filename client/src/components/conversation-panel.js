import React, { useEffect, useState } from "react";
import axios from "axios";

import List from "@material-ui/core/List";
import ConversationCard from "../components/conversation-card";
const ConversationPanel = (props) => {
  const [conversationRecipients, setConversationRecipients] = useState([]);
  useEffect(() => {
    const getConversationRecipients = async () => {
      const response = await axios.get("/conversations");
      setConversationRecipients(response.data);
    };
    getConversationRecipients();
  }, []);
  return (
    <List
      style={{
        overflow: "auto",
        flexWrap: "nowrap",
        height: "100%",
        padding: "0",
      }}
    >
      <ConversationCard user={props.username} />
      {conversationRecipients.map((recipient) => (
        <ConversationCard user={recipient} />
      ))}
    </List>
  );
};

export default ConversationPanel;
