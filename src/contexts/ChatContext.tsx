import React, { createContext, useContext, ReactNode } from 'react';
import { useChat } from '@ai-sdk/react';
import { ChatMessageProps } from '../components/chat/ChatMessage';

interface ChatContextType {
  messages: ChatMessageProps[];
  isLoading: boolean;
  sendMessage: (content: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const { messages: aiMessages, status, sendMessage: aiSendMessage } = useChat();

  const messages: ChatMessageProps[] = aiMessages.map((msg: any, index) => ({
    id: index.toString(),
    type: msg.role === 'user' ? 'user' : 'agent',
    content: msg.content || '',
  }));

  const isLoading = status === 'streaming' || status === 'submitted';

  const sendMessage = (content: string) => {
    aiSendMessage({ role: 'user', content } as any);
  };

  const value: ChatContextType = {
    messages,
    isLoading,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};