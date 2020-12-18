import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { withStyles } from "@material-ui/core/styles";
import conversationCardStyles from "../styles/conversation-card-styles";

const ConversationCard = (props) => {
  const { classes } = props;
  return (
    <ListItem button className={classes.conversationCard} alignItems="center">
      <ListItemIcon style={{ width: "30%" }}>
        <AccountCircleIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText style={{ textAlign: "center" }} primary={props.user} />
    </ListItem>
  );
};
export default withStyles(conversationCardStyles)(ConversationCard);
