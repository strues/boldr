import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';
import jsonResult from 'boldr-utils/es/gql/jsonResult';
import Article from '../../models/Article';
import ArticleType from './articleType';

export default {
  getArticles: {
    type: new GraphQLList(ArticleType),
    description: 'A paginated query for all the articles.',
    args: {
      offset: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The number of articles to offset',
      },
      limit: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The maximum number of articles to return at a time.',
      },
    },
    async resolve(source, { offset, limit }, context) {
      const articles = await Article.getArticles(offset, limit).then(
        jsonResult,
      );
      return articles;
    },
  },
  getArticlesForTag: {
    type: new GraphQLList(ArticleType),
    description: 'Return all articles matching the given tag.',
    async resolve(source, { name, offset, limit }, context) {
      const articles = await Article.getArticlesByTag(name, offset, limit).then(
        jsonResult,
      );
      if (!articles) {
        throw errorObj({ _error: 'Project ID not found' });
      }
      return articles;
    },
  },
  getArticleById: {
    type: ArticleType,
    description: 'Return a specific article using its id',
    async resolve(source, args, context) {
      const article = await Article.getArticleById(args.id).then(jsonResult);
      if (!article) {
        throw errorObj({ _error: 'Project ID not found' });
      }
      return article;
    },
  },
  getArticleBySlug: {
    type: ArticleType,
    description: 'Return a specific article using its slug',
    async resolve(source, args, context) {
      const article = await Article.getArticleBySlug(args.slug).then(
        jsonResult,
      );
      if (!article) {
        throw errorObj({ _error: 'Project ID not found' });
      }
      return article;
    },
  },
};
