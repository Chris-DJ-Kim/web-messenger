import React, { useEffect, useState } from "react";
import axios from "axios";

import List from "@material-ui/core/List";

import ConversationCard from "../components/conversation-card";
import SearchBar from "../components/search-bar";
import Typography from "@material-ui/core/Typography";

const ConversationPanel = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const {
    setCurrentConversation,
    currentConversation,
    setCurrentConversationRetrievedMessages,
    username,
    setUsername,
    socket,
  } = props;
  useEffect(() => {
    //Gets all conversations the current user has
    const getConversations = async () => {
      const response = await axios.get("/conversations");
      setConversations(response.data.conversations);
      setUsername(response.data.username);
    };
    //Gets all users in messaging app for search feature
    const getAllUsers = async () => {
      const response = await axios.get("/conversations/allUsers");
      setAllUsers(response.data);
    };
    getConversations();
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
      <Typography variant="h4" style={{ padding: "1vh" }}>
        Chats
      </Typography>
      <SearchBar
        allUsers={allUsers}
        currentConversation={currentConversation}
        setCurrentConversation={setCurrentConversation}
        setCurrentConversationRetrievedMessages={
          setCurrentConversationRetrievedMessages
        }
        setConversationRecipients={setConversations}
        conversationRecipients={conversations}
        currentUser={username}
        conversationId={currentConversation.conversationId}
        socket={socket}
      />
      {conversations.map((recipient, index) => (
        <ConversationCard
          user={recipient.username}
          conversationId={recipient.conversationId}
          key={`${recipient.conversationId}_${index}`}
          setCurrentConversation={setCurrentConversation}
          currentConversation={currentConversation}
          setCurrentConversationRetrievedMessages={
            setCurrentConversationRetrievedMessages
          }
          conversationRecipients={conversations}
          conversation={true}
          socket={socket}
        />
      ))}
    </List>
  );
};

export default ConversationPanel;
