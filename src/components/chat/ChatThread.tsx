import React from 'react';
import { View } from "@khanacademy/wonder-blocks-core";
import { sizing } from "@khanacademy/wonder-blocks-tokens";
import { ChatMessage } from "./ChatMessage";
import { useChatContext } from '../../contexts/ChatContext';

const ChatThread: React.FC = () => {
  const { messages } = useChatContext();

  return (
      <View
        style={{
          minHeight: "min-content",
          gap: sizing.size_120
        }}
      >
        {
          messages.map((message) => (
            <ChatMessage key={message.id} {...message} />
          ))
        }
      </View>
  );
};

export default ChatThread;