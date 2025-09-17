import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
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
  const [messages, setMessages] = useState<ChatMessageProps[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (content: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, {
      id: "0",
      type: 'user',
      content: content,
    }]);
    
    try {
      const response = await fetch('/api/article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: content }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate article');
      }
      
      const data = await response.json();
      console.log(data[0])
      
      setMessages(prev => [...prev, {
        type: 'agent',
        content: data[0].text || 'No response received',
        id: "0"
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
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