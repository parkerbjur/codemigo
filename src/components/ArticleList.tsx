import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { View } from "@khanacademy/wonder-blocks-core";
import { LabelLarge, Body } from "@khanacademy/wonder-blocks-typography";
import { CompactCell } from "@khanacademy/wonder-blocks-cell"
import { useArticleContext } from '../contexts/ArticleContext';

const ArticleList: React.FC = () => {
  const { articles } = useArticleContext();
  const location = useLocation();
  const history = useHistory();
  // Extract id from pathname manually
  const match = location.pathname.match(/^\/article\/(\d+)$/);
  const id = match ? parseInt(match[1]) : undefined;

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
              active={index == id}
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