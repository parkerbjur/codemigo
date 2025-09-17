import React from 'react';
import { Body, LabelLarge, BodyText } from "@khanacademy/wonder-blocks-typography";
import { View } from "@khanacademy/wonder-blocks-core"

export interface ChatMessageProps {
  id: string;
  type: 'user' | 'agent';
  content: string | React.ReactNode;
  perseusData?: any;
}

export const ChatMessage: React.FC<ChatMessageProps> = (message) => {
  const isUser = message.type === 'user';

  return (
    <View>
      <LabelLarge>{isUser ? "You" : "Assistant"}</LabelLarge>
      <Body>
        {typeof message.content === 'string' ? (
          <BodyText>{message.content}</BodyText>
        ) : (
          message.content
        )}
      </Body> 
    </View>
  );
};
