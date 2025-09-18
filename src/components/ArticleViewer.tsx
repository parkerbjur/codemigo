import React from 'react';
import { useParams } from 'react-router-dom';
import { CircularSpinner } from '@khanacademy/wonder-blocks-progress-spinner'
import { ArticleRenderer } from '@khanacademy/perseus';
import { useArticleContext } from '../contexts/ArticleContext';
import { testDependenciesV2 } from '../contexts/ChatContext';

const ArticleViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { articles, loading } = useArticleContext();
  const article = articles[parseInt(id, 10)];
  
  if (loading) {
    return <CircularSpinner/>
  }

  return (
    <ArticleRenderer json={article} dependencies={testDependenciesV2}></ArticleRenderer>
  );
};

export default ArticleViewer;