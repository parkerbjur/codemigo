import React from 'react';
import { View } from "@khanacademy/wonder-blocks-core";
import { ChatProvider } from '../../contexts/ChatContext';
import ChatInput from './ChatInput';
import ChatThread from './ChatThread';

interface ChatInterfaceProps {
  style?: React.CSSProperties;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ style }) => {
  return (
    <ChatProvider>
      <View style={{ 
        height: '100%', 
        ...style
      }}>
        <View style={{
          flex: 1,
          overflow: "auto",
        }}>
          <ChatThread />
        </View>
        <ChatInput />
      </View>
    </ChatProvider>
  );
};

export default ChatInterface;