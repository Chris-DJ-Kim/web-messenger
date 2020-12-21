import React, { useEffect, useState } from "react";
import axios from "axios";

import List from "@material-ui/core/List";

import ConversationCard from "../components/conversation-card";
import SearchBar from "../components/search-bar";

const ConversationPanel = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [conversationRecipients, setConversationRecipients] = useState([]);
  const {
    setCurrentConversation,
    currentConversation,
    setCurrentConversationMessages,
    username,
    setUsername,
    socket,
  } = props;
  useEffect(() => {
    //Gets all conversations the current user has
    const getConversationRecipients = async () => {
      const response = await axios.get("/conversations");
      setConversationRecipients(response.data.conversations);
      setUsername(response.data.username);
    };
    //Gets all users in messaging app for search feature
    const getAllUsers = async () => {
      const response = await axios.get("/conversations/allUsers");
      setAllUsers(response.data);
    };
    getConversationRecipients();
    getAllUsers();
  }, [setUsername]);
  return (
    <List
      style={{
        overflow: "auto",
        flexWrap: "nowrap",
        height: "100%",
        padding: "0",
      }}
    >
      <ConversationCard user={username} conversation={false} />
      <SearchBar
        allUsers={allUsers}
        currentConversation={currentConversation}
        setCurrentConversation={setCurrentConversation}
        setCurrentConversationMessages={setCurrentConversationMessages}
        setConversationRecipients={setConversationRecipients}
        conversationRecipients={conversationRecipients}
        currentUser={username}
        conversationId={currentConversation.conversationId}
        socket={socket}
      />
      {conversationRecipients.map((recipient, index) => (
        <ConversationCard
          user={recipient.username}
          conversationId={recipient.conversationId}
          key={`${recipient.conversationId}_${index}`}
          setCurrentConversation={setCurrentConversation}
          currentConversation={currentConversation}
          setCurrentConversationMessages={setCurrentConversationMessages}
          conversation={true}
          socket={socket}
        />
      ))}
    </List>
  );
};

export default ConversationPanel;
