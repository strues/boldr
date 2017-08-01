import { GraphQLList, GraphQLInt, GraphQLString } from 'graphql';
import Article from '../../models/Article';
import ArticleType from './articleType';

export default {
  articles: {
    type: new GraphQLList(ArticleType),
    name: 'GetArticlesQuery',
    description: 'Returns all articles from the database..',
    args: {
      offset: {
        type: GraphQLInt,
        description: 'The number of articles to offset',
      },
      limit: {
        type: GraphQLInt,
        description: 'The maximum number of articles to return at a time.',
      },
    },
    // eslint-disable-next-line
    resolve(_, { offset, limit }) {
      // const articles = Article.getArticles(offset, limit).then(jsonResult);
      return Article.getArticles(offset, limit);
    },
  },
  getArticlesForTag: {
    type: new GraphQLList(ArticleType),
    description: 'Return all articles matching the given tag.',
    args: {
      name: { type: GraphQLString },
      offset: { type: GraphQLInt },
      limit: { type: GraphQLInt },
    },
    // eslint-disable-next-line
    resolve(_, { name, offset, limit }) {
      return Article.getArticlesByTag(name, offset, limit);
    },
  },

  getArticleBySlug: {
    type: ArticleType,
    description: 'Return a specific article using its slug',
    args: {
      slug: { type: GraphQLString },
    },
    // eslint-disable-next-line
    resolve(_, { slug }) {
      // const article = await Article.getArticleBySlug(slug);

      return Article.getArticleBySlug(slug);
    },
  },
};
