import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ChatMessageProps } from '../components/chat/ChatMessage';

interface ChatContextType {
  messages: ChatMessageProps[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
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
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageCounter, setMessageCounter] = useState(0);

  const sendMessage = async (content: string) => {
    setMessageCounter(prev => prev + 1);
    const userMessageId = messageCounter + 1;
    
    const userMessage: ChatMessageProps = {
      id: userMessageId.toString(),
      type: 'user',
      content,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      setMessageCounter(prev => prev + 1);
      const agentMessageId = messageCounter + 2;
      
      const agentMessage: ChatMessageProps = {
        id: agentMessageId.toString(),
        type: 'agent',
        content: 'Generated article',
      };

      setMessages(prev => [...prev, agentMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const value: ChatContextType = {
    messages,
    isLoading,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};