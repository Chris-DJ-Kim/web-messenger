import React, { useState } from "react";

import MessagePlatform from "../components/Message-platform";

const clientIo = require("socket.io-client");
const MessagePage = () => {
  const [currentConversation, setCurrentConversation] = useState("");
  if (currentConversation) {
    const socket = clientIo({
      query: { roomId: currentConversation.conversationId },
    });

    return (
      <MessagePlatform
        isConnected={true}
        socket={socket}
        currentConversation={currentConversation}
        setCurrentConversation={setCurrentConversation}
      />
    );
  }

  return (
    <MessagePlatform
      isConnected={false}
      currentConversation={currentConversation}
      setCurrentConversation={setCurrentConversation}
    />
  );
};

export default MessagePage;
