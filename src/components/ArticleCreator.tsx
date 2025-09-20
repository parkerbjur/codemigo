import React, {useState} from 'react';
import { View } from "@khanacademy/wonder-blocks-core"
import { Spring } from "@khanacademy/wonder-blocks-layout"
import { useHistory } from 'react-router-dom';
import { sizing } from "@khanacademy/wonder-blocks-tokens"
import { HeadingLarge } from '@khanacademy/wonder-blocks-typography'; 
import { useArticleContext } from "../contexts/ArticleContext"
import ChatInput from './chat/ChatInput';
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";

const ArticleCreator: React.FC = () => {
  const { createArticle } = useArticleContext()
  const [loading, setLoading] = useState<boolean>(false)
  const history = useHistory()

  const onSend = (content: string) => {
    setLoading(true)
    createArticle(content).then((article) => {
      setLoading(false)
      history.push(`/articles/${ article.id }`)
    })
  }

  return (
    <View style={{
      height: "100%",
    }}>
      <Spring />
      {loading ? (
        <View style={{ flexDirection: "row" }}>
          <Spring />
          <CircularSpinner />
          <Spring />
        </View>
      ) : (
        <View style={{ gap: sizing.size_120 }}>
          <View style={{ flexDirection:"row" }}>
            <Spring />
            <HeadingLarge>What will you create today?</HeadingLarge>
            <Spring />
          </View>
          <ChatInput onSend={onSend} />
        </View>
      )}
      <Spring />
    </View>
  )
};

export default ArticleCreator;
