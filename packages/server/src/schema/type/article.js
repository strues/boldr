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
import cached from '../field/cached';
import Article from '../../models/Article';
import UserType from './user';
import MediaType from './media';
import TagType from './tag';
import CategoryType from './category';

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  description: 'A blog post or article',
  fields: () => ({
    id: globalIdField(),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the article',
    },
    cached,
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
    heroImage: {
      type: GraphQLString,
      description: 'url of the article hero image',
    },
    userId: {
      type: GraphQLID,
      description: 'True if the article is published',
    },
    categoryId: {
      type: GraphQLID,
      description: 'The category id',
    },
    ...dateCUD,
    tags: {
      type: new GraphQLList(TagType),
      description: 'Tags relating articles together',
      // eslint-disable-next-line
      resolve(root, args, ctx) {
        return Article.query()
          .findById(root.id)
          .then(result => result.$relatedQuery('tags'));
      },
    },
    media: {
      type: new GraphQLList(MediaType),
      description: 'Media uploaded with the article',
      resolve(root, args, ctx) {
        return Article.query()
          .findById(root.id)
          .then(result => result.$relatedQuery('media'));
      },
    },
    author: {
      type: UserType,
      description: 'Users belonging to a role.',
      resolve(root, args, ctx) {
        return Article.query()
          .findById(root.id)
          .then(result => result.$relatedQuery('author'));
      },
    },
    category: {
      type: CategoryType,
      description: 'Category the article belongs to.',
      resolve(root, args, ctx) {
        return Article.query()
          .findById(root.id)
          .then(result => result.$relatedQuery('category'));
      },
    },
  }),
});

export default ArticleType;
