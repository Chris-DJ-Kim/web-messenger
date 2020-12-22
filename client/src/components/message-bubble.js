import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { withStyles } from "@material-ui/core/styles";
import messageBubbleStyles from "../styles/message-bubble-styles";

const MessageBubble = (props) => {
  const { classes, myMessage, message } = props;
  return (
    <ListItem
      style={
        myMessage
          ? { textAlign: "right", paddingLeft: "50vh" }
          : { textAlign: "left", paddingRight: "50vh" }
      }
      button
      disableTouchRipple
      color="secondary"
      className={classes.messageBubble}
    >
      <ListItemText primary={message} />
    </ListItem>
  );
};
export default withStyles(messageBubbleStyles)(MessageBubble);
