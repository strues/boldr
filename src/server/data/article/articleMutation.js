import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import { GraphQLUUID } from '../scalars';
import Article from '../../models/Article';
import ArticleType, { CreateArticleInput } from './articleType';

export default {
  createArticle: {
    type: ArticleType,
    description: 'Adds a new article to the database.',
    args: {
      article: {
        type: new GraphQLNonNull(CreateArticleInput),
      },
    },
    async resolve(_, args, context) {

    },
  },
};
