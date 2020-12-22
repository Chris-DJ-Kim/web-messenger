import React, { useState } from "react";

import MessagePlatform from "../components/Message-platform";

const clientIo = require("socket.io-client");

const MessagePage = () => {
  const [currentConversation, setCurrentConversation] = useState("");
  if (currentConversation) {
    const socket = clientIo({
      query: { roomId: currentConversation.conversationId },
    });
    console.log("Message Page Rendered with socket");

    return (
      <MessagePlatform
        isConnected={true}
        socket={socket}
        currentConversation={currentConversation}
        setCurrentConversation={setCurrentConversation}
      />
    );
  }
  console.log("Message Page Rendered");

  return (
    <MessagePlatform
      isConnected={false}
      currentConversation={currentConversation}
      setCurrentConversation={setCurrentConversation}
    />
  );
};

export default MessagePage;
