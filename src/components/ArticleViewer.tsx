import React from 'react';
import { useParams } from 'react-router-dom';
import { CircularSpinner } from '@khanacademy/wonder-blocks-progress-spinner'
import { ArticleRenderer } from '@khanacademy/perseus';
import { useArticleContext } from '../contexts/ArticleContext';
import { testDependenciesV2 } from '../contexts/ChatContext';

const ArticleViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { articles, loading } = useArticleContext();
  const article = articles.find(article => article.id == id)

  if (!article) {
    return <div></div>
  }
  
  if (loading) {
    return <CircularSpinner/>
  }

  return (
    <ArticleRenderer json={article.article} dependencies={testDependenciesV2}></ArticleRenderer>
  );
};

export default ArticleViewer;
