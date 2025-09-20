import React from 'react';
import { useHistory, useLocation, useParams, matchPath } from 'react-router-dom';
import { View } from "@khanacademy/wonder-blocks-core";
import { LabelLarge, Body } from "@khanacademy/wonder-blocks-typography";
import { CompactCell } from "@khanacademy/wonder-blocks-cell"
import { useArticleContext } from '../contexts/ArticleContext';
import { PerseusArticle, PerseusRenderer } from "@khanacademy/perseus-core"

const extractHeading = (article: PerseusArticle) => {
    const articleContent = article
    let article_section: PerseusRenderer = Array.isArray(articleContent) ? (
      articleContent[0]
    ) : ( articleContent )
    const r = /^#+\s*(.+)/g // Extract the first heading from the markdown
    const matches = r.exec(article_section.content)
    let heading = matches?.[1] // group 1 contains the heading text
    if (!heading) {
      throw "No Heading"
    }
    return heading
}

const ArticleList: React.FC = () => {
  const { articles } = useArticleContext();
  const history = useHistory();
  const location = useLocation();

  const match = matchPath(
    location.pathname,
    "/articles/:id",
  ) 
  // @ts-ignore ts complains that id doesnt exist on {}
  const id = match?.params?.id

  return (
    <View>
      <LabelLarge style={{
        paddingLeft: "16px"
      }}>Articles</LabelLarge>
      {articles.length === 0 ? (
        <Body>No articles yet</Body>
      ) : (
        <View>
          {articles.map((article, index) => {
            let heading = "Article"
            try { heading = extractHeading(article.article) }
            catch {}
            return (
              <CompactCell
                active={article.id == id}
                title={heading}
                key={article.id}
                onClick={() => history.push(`/articles/${article.id}`)}
              />
            )
          })}
        </View>
      )}
    </View>
  );
};

export default ArticleList;
