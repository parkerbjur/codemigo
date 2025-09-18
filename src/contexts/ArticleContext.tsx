import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { PerseusRenderer } from '@khanacademy/perseus-core';

interface Article extends PerseusRenderer {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface ArticleContextType {
  articles: Article[];
  createArticle: (title: string, content: PerseusRenderer) => Promise<Article>;
  loading: boolean;
  error: string | null;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const useArticleContext = () => {
  const context = useContext(ArticleContext);
  if (context === undefined) {
    throw new Error('useArticleContext must be used within an ArticleProvider');
  }
  return context;
};

interface ArticleProviderProps {
  children: ReactNode;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

export const ArticleProvider: React.FC<ArticleProviderProps> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/articles`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.statusText}`);
      }
      
      const fetchedArticles = await response.json();
      console.log(fetchedArticles)
      setArticles(fetchedArticles);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch articles';
      setError(errorMessage);
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const createArticle = async (title: string, content: PerseusRenderer): Promise<Article> => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content: content.content,
          images: content.images,
          widgets: content.widgets,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create article: ${response.statusText}`);
      }

      const newArticle = await response.json();
      setArticles(prev => [...prev, newArticle]);
      return newArticle;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create article';
      setError(errorMessage);
      console.error('Error creating article:', err);
      throw err;
    }
  };

  const value: ArticleContextType = {
    articles,
    createArticle,
    loading,
    error,
  };

  return <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>;
};