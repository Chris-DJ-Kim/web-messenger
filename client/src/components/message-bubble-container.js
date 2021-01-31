import React, { useEffect, useState } from "react";

import List from "@material-ui/core/List";

import MessageBubble from "./message-bubble";

const MessageBubbleContainer = (props) => {
  const {
    username,
    currentConversationRetrievedMessages,
    isConnected,
    socket,
  } = props;
  const [realTimeMessages, setRealTimeMessages] = useState([]);
  useEffect(() => {
    setRealTimeMessages(currentConversationRetrievedMessages);
  }, [currentConversationRetrievedMessages]);
  if (isConnected) {
    //Turns off any previous listerners from previous renders
    socket.off("message");

    socket.on("message", (content) => {
      setRealTimeMessages([
        ...realTimeMessages,
        {
          content: content.message,
          sender: content.sender,
          createdAt: content.createdAt,
          conversationId: content.conversationId,
          _id: content._id,
        },
      ]);
      //   }
    });
  }
  if (realTimeMessages.length > 0) {
    return (
      <List
        style={{
          overflow: "auto",
          flexWrap: "wrap",
          height: "100%",
          padding: "0",
        }}
      >
        {realTimeMessages.map((msg) => {
          //So that style can be set conditionally on if the message is from the logged in user
          //or is from someone else
          if (msg.sender === username) {
            return (
              <MessageBubble
                key={msg._id}
                myMessage={true}
                message={msg.content}
              />
            );
          }
          return (
            <MessageBubble
              key={msg._id}
              myMessage={false}
              message={msg.content}
            />
          );
        })}
      </List>
    );
  }
  return (
    <List
      style={{
        overflow: "auto",
        flexWrap: "nowrap",
        height: "100%",
        padding: "0",
      }}
    ></List>
  );
};

export default MessageBubbleContainer;
