import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { PerseusArticle } from '@khanacademy/perseus-core';


interface ArticleContextType {
  articles: PerseusArticle[];
  createArticle: (prompt: string) => Promise<PerseusArticle>;
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
  const [articles, setArticles] = useState<PerseusArticle[]>([]);
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

  const createArticle = async (content: string): Promise<PerseusArticle> => {
    try {
      const response = await fetch('http://127.0.0.1:3001/api/article', {
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
      const generatedArticle: PerseusArticle = {
        content: data[0].text,
        images: {},
        widgets: {}
      }
      setError(null);
      return generatedArticle;
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
