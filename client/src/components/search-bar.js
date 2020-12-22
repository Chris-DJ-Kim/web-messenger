import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { Container } from "@material-ui/core";

import ConversationCard from "../components/conversation-card";

const SearchBar = (props) => {
  const {
    allUsers,
    setCurrentConversation,
    setCurrentConversationRetrievedMessages,
    setConversationRecipients,
    conversationRecipients,
    currentUser,
    conversationId,
    socket,
  } = props;
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const handleChange = (event) => {
    const value = event.target.value;

    setSearchValue(value);
    console.log(searchValue);
    //To ensure you can't search for literally everyone by having a blank search bar
    //If a 'search all' feature is needed, remove if condition

    //Makes sure you can't search for yourself
    //Also filters out user if that user already exists in the conversation panel
    if (value.length > 0) {
      const tempFilter = allUsers.filter(
        (username) =>
          username.includes(value.toLowerCase()) && username !== currentUser
      );

      if (!conversationRecipients) {
        return;
      }
      const exists = (username) =>
        conversationRecipients.find(
          (conversation) => conversation.username === username
        );
      setFilteredUsers(tempFilter.filter((username) => !exists(username)));
      console.log(filteredUsers);
    }
    if (value.length === 0) {
      setFilteredUsers([]);
    }
  };

  return (
    <Container style={{ padding: "0" }}>
      <TextField
        autoComplete="off"
        variant="filled"
        fullWidth
        placeholder="Search for users"
        onChange={handleChange}
        value={searchValue}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      ></TextField>
      {filteredUsers.map((user, index) => (
        <ConversationCard
          key={`${user}_search_${index}`}
          user={user}
          conversationId={conversationId}
          setCurrentConversation={setCurrentConversation}
          setCurrentConversationRetrievedMessages={
            setCurrentConversationRetrievedMessages
          }
          setConversationRecipients={setConversationRecipients}
          conversationRecipients={conversationRecipients}
          conversation={true}
          fromSearchBar={true}
          setSearchValue={setSearchValue}
          setFilteredUsers={setFilteredUsers}
          socket={socket}
        />
      ))}
    </Container>
  );
};

export default SearchBar;
