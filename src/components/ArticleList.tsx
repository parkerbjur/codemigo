import React from 'react';
import { useHistory } from 'react-router-dom';
import { View } from "@khanacademy/wonder-blocks-core";
import { LabelLarge, Body } from "@khanacademy/wonder-blocks-typography";
import { CompactCell } from "@khanacademy/wonder-blocks-cell"
import { useArticleContext } from '../contexts/ArticleContext';

const ArticleList: React.FC = () => {
  const { articles } = useArticleContext();
  const history = useHistory();

  return (
    <View>
      <LabelLarge style={{
        paddingLeft: "16px"
      }}>Articles</LabelLarge>
      {articles.length === 0 ? (
        <Body>No articles yet</Body>
      ) : (
        <View>
          {articles.map((article, index) => (
            <CompactCell
              title={index.toString()}
              key={index}
              onClick={() => history.push(`/article/${index}`)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default ArticleList;