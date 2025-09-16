import React, { useState } from 'react';
import { View } from "@khanacademy/wonder-blocks-core"
import { TextField } from "@khanacademy/wonder-blocks-form"
import Button from "@khanacademy/wonder-blocks-button";
import { useChatContext } from '../../contexts/ChatContext';

const ChatInput: React.FC = () => {
  const { sendMessage, isLoading } = useChatContext();
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !isLoading) {
      sendMessage(trimmedMessage);
      setMessage('');
    }
  };

  return (
    <View style={{flexDirection: "row"}} >
      <TextField
        value={message}
        onChange={(value: string) => setMessage(value)}
        placeholder="Ask me to create a Perseus article..."
        disabled={isLoading}
      />
      <Button
        onClick={handleSend}
        disabled={isLoading || !message.trim()}
      >
        Send
      </Button>
    </View>
  );
};

export default ChatInput;