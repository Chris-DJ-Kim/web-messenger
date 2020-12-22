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
    currentConversation,
    setCurrentConversation,
    setCurrentConversationMessages,
    user,
    conversation,
    conversationId,
    setConversationRecipients,
    conversationRecipients,
    fromSearchBar,
    socket,
  } = props;
  //Can only be called if this is a 'conversation' card
  const setConversation = async () => {
    //Resets search bar
    if (fromSearchBar) {
      props.setSearchValue("");
      props.setFilteredUsers([]);
    }

    //Doesn't set conversation if you are already on the chosen conversation
    //Example: if im in a conversation with 'Jane' and I click on her conversation card
    //I do not reset the current conversation
    // console.log(currentConversation);
    // if (currentConversation) {
    //   if (currentConversation.conversationId !== conversationId) {
    //     setCurrentConversation({ conversationId, user });
    //     //Closes current socket connection when moving to new conversation
    //     if (socket) {
    //       socket.close();
    //     }
    //     return;
    //   }
    // }

    const response = await axios.get("/messages", {
      params: {
        conversationId: conversationId,
      },
    });
    // console.log(response.data);

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

    //If this is a new user to talk to, creates a new conversation card
    //Only does this if this conversation card is from the users search bar

    const existingConversation = conversationRecipients.find(
      (conversation) => conversation.username === user
    );
    console.log("exitingConversation?", existingConversation);
    if (!existingConversation) {
      const response = await axios.post("/conversations", {
        recipientName: user,
      });
      const { conversationId, username } = response.data;
      setConversationRecipients([
        ...conversationRecipients,
        { conversationId: conversationId, username: username },
      ]);

      // setCurrentConversation({ conversationId: conversationId, user: user });
      // setCurrentConversationMessages(messages);

      // setCurrentConversation({
      //   conversationId: conversationId,
      //   user: username,
      // });
      if (socket) {
        socket.close();
      }
      return;
    }

    console.log(conversationId);
    //Runs if the conversation exists

    console.log("currentConversation?", currentConversation);
    if (currentConversation) {
      if (currentConversation.conversationId !== conversationId) {
        setCurrentConversation({ conversationId: conversationId, user: user });
        setCurrentConversationMessages(messages);
        //Closes current socket connection when moving to new conversation
      }
      if (socket) {
        socket.close();
      }
    }

    if (!currentConversation) {
      setCurrentConversation({ conversationId: conversationId, user: user });
      setCurrentConversationMessages(messages);
    }
    if (socket) {
      socket.close();
    }
    console.log("Should be close", socket);
  };

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
