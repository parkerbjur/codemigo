import React, { useState } from 'react';
import { View } from "@khanacademy/wonder-blocks-core"
import { Spring, Strut } from "@khanacademy/wonder-blocks-layout"
import { sizing } from "@khanacademy/wonder-blocks-tokens"
import { HeadingLarge } from '@khanacademy/wonder-blocks-typography'; 
import { useArticleContext } from "../contexts/ArticleContext"
import ChatInput from './chat/ChatInput';

const ArticleCreator: React.FC = () => {
  const { createArticle } = useArticleContext()
  const [loading, setLoading] = useState<boolean>(false)

  const onSend = (content: string) => {
    setLoading(true)
    createArticle(content).then((article) => {
      setLoading(false)
      console.log(article)
    })
  }

  return (
    loading ? (
      <View></View>
    ) : (
      <View style={{
        height: "100%",
        gap: sizing.size_120
      }}>
        <Spring />
        <View style={{ flexDirection:"row" }}>
          <Spring />
            <HeadingLarge>What will you create today?</HeadingLarge>
          <Spring />
        </View>

        <ChatInput onSend={onSend} />
        <Spring />
      </View>
    )
  )
};

export default ArticleCreator;
