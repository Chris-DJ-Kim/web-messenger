import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { withStyles } from "@material-ui/core/styles";
import messageBubbleStyles from "../styles/message-bubble-styles";

const MessageBubble = (props) => {
  const { classes, myMessage, message } = props;
  return (
    <ListItem button className={classes.messageBubble} alignItems="center">
      <ListItemText
        style={myMessage ? { textAlign: "right" } : { textAlign: "left" }}
        primary={message}
      />
    </ListItem>
  );
};
export default withStyles(messageBubbleStyles)(MessageBubble);
