import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { withStyles } from "@material-ui/core/styles";
import messageBubbleStyles from "../styles/message-bubble-styles";

const MessageBubble = (props) => {
  const { classes } = props;
  return (
    <ListItem button className={classes.messageBubble} alignItems="center">
      <ListItemText style={{ textAlign: "center" }} primary={props.message} />
    </ListItem>
  );
};
export default withStyles(messageBubbleStyles)(MessageBubble);
