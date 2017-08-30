import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
} from 'graphql';
import { GraphQLJSON } from '../scalars';
import { globalIdField, slug } from '../field/identifier';
import { dateCUD } from '../field/date';

import Article from '../../models/Article';
import UserType from './user';
import MediaType from './media';
import TagType from './tag';

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  description: 'A blog post or article',
  fields: () => ({
    id: globalIdField(),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the article',
    },
    ...slug,
    content: {
      type: GraphQLString,
      description: 'html content of the article',
    },
    rawContent: {
      type: GraphQLJSON,
      description: 'Raw JSON of the article',
    },
    excerpt: {
      type: GraphQLString,
      description: 'Short description of the article',
    },
    featured: {
      type: GraphQLBoolean,
      description: 'True if the article is featured',
    },
    published: {
      type: GraphQLBoolean,
      description: 'True if the article is published',
    },
    image: {
      type: GraphQLString,
      description: 'url of the article feature image',
    },
    userId: {
      type: GraphQLID,
      description: 'True if the article is published',
    },
    ...dateCUD,
    tags: {
      type: new GraphQLList(TagType),
      description: 'Tags relating articles together',
      // eslint-disable-next-line
      resolve(_, args, ctx) {
        return Article.query()
          .findById(_.id)
          .then(result => result.$relatedQuery('tags'));
      },
    },
    media: {
      type: new GraphQLList(MediaType),
      description: 'Media uploaded with the article',
    },
    author: {
      type: UserType,
      description: 'Users belonging to a role.',
    },
  }),
});

export default ArticleType;
