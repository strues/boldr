import { GraphQLList, GraphQLInt, GraphQLString } from 'graphql';
import Article from '../../models/Article';
import { errorObj } from '../../errors';
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
    async resolve(_, { offset, limit }, context) {
      const articles = await Article.getArticles(offset, limit);
      if (articles) {
        return articles;
      }
      throw errorObj({ _error: 'Unable to locate any articles' });
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
    async resolve(_, { name, offset, limit }, context) {
      const article = await Article.getArticlesByTag(name, offset, limit);
      if (article) {
        return article;
      }
      throw errorObj({ _error: 'Unable to locate an articles matching the tag' });
    },
  },

  getArticleBySlug: {
    type: ArticleType,
    description: 'Return a specific article using its slug',
    args: {
      slug: { type: GraphQLString },
    },
    // eslint-disable-next-line
    async resolve(_, { slug }, context) {
      const article = await Article.getArticleBySlug(slug);
      if (article) {
        return article;
      }
      throw errorObj({ _error: 'Unable to locate an articles matching the slug' });
    },
  },
};
