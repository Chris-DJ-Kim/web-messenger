import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import conversationCardStyles from "../styles/conversation-card-styles";

const ConversationCard = (props) => {
  const {
    classes,
    setCurrentConversation,
    setCurrentConversationMessages,
    user,
    conversation,
    conversationId,
    setConversationRecipients,
    conversationRecipients,
    fromSearchBar,
  } = props;
  //Can only be called if this is a 'conversation' card
  const setConversation = async () => {
    setCurrentConversation({ conversationId, user });
    //If this is a new user to talk to, creates a new conversation card
    if (fromSearchBar && !conversationRecipients.includes(user)) {
      const response = await axios.post("/conversations", {
        recipientName: user,
      });
      const { conversationId, username } = response.data;
      console.log(conversationId, username);
      setConversationRecipients([
        ...conversationRecipients,
        { conversationId: conversationId, username: username },
      ]);
      setCurrentConversation({
        conversationId: conversationId,
        user: username,
      });
      return;
    }
    const response = await axios.get("/messages", {
      params: {
        conversationId: conversationId,
      },
    });
    //Cleans up the response before using
    const messages = response.data.map((message) => {
      return {
        content: message.content,
        conversationId: message.conversationId,
        sender: message.sender.username,
        createdAt: message.createdAt,
        _id: message._id,
      };
    });
    console.log(messages);
    setCurrentConversationMessages(messages);
  };
  console.log("render!");
  return (
    <ListItem
      button
      className={classes.conversationCard}
      onClick={conversation ? setConversation : null}
      alignItems="center"
    >
      <ListItemIcon style={{ width: "30%" }}>
        <AccountCircleIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText style={{ textAlign: "center" }} primary={user} />
    </ListItem>
  );
};
export default withStyles(conversationCardStyles)(ConversationCard);
