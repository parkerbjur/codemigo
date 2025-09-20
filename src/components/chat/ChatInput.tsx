import React, { useState } from 'react';
import { View } from "@khanacademy/wonder-blocks-core"
import { TextField } from "@khanacademy/wonder-blocks-form"
import Button from "@khanacademy/wonder-blocks-button";
import { sizing } from "@khanacademy/wonder-blocks-tokens"

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSend(trimmedMessage);
      setMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <View style={{flexDirection: "row", gap: sizing.size_120}} >
      <TextField
        value={message}
        onChange={(value: string) => setMessage(value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask me to create a Perseus article..."
        disabled={disabled}
      />
      <Button
        onClick={handleSend}
        disabled={disabled || !message.trim()}
      >
        Send
      </Button>
    </View>
  );
};

export default ChatInput;
