import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLString } from 'graphql';
import jsonResult from 'boldr-utils/lib/gql/jsonResult';
import { GraphQLUUID } from '../scalars';
import Article from '../../models/Article';
import ArticleType from './articleType';

export default {
  articles: {
    type: new GraphQLList(ArticleType),
    name: 'GetArticlesQuery',
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
      const articles = await Article.getArticles(offset, limit).then(jsonResult);
      return articles;
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
    async resolve(source, { name, offset, limit }, context) {
      const articles = await Article.getArticlesByTag(name, offset, limit).then(jsonResult);
      if (!articles) {
        throw errorObj({ _error: 'Project ID not found' });
      }
      return articles;
    },
  },

  getArticleBySlug: {
    type: ArticleType,
    description: 'Return a specific article using its slug',
    args: {
      slug: { type: GraphQLString },
    },
    async resolve(_, { slug }, context) {
      const article = await Article.getArticleBySlug(slug);
      if (!article) {
        throw errorObj({ _error: 'Project ID not found' });
      }
      return article;
    },
  },
};
