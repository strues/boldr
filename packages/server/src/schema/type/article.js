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
import CONTENT_STATUS from '../enum/contentStatus';
import Article from '../../models/Article';
import AccountType from './account';
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
    status: {
      type: CONTENT_STATUS,
      description: 'The publishing status of content',
    },
    image: {
      type: GraphQLString,
      description: 'url of the article feature image',
    },
    heroImage: {
      type: GraphQLString,
      description: 'url of the article hero image',
    },
    authorId: {
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
      resolve(obj, args, ctx) {
        return Article.query()
          .findById(obj.id)
          .then(result => result.$relatedQuery('tags'));
      },
    },
    media: {
      type: new GraphQLList(MediaType),
      description: 'Media uploaded with the article',
      resolve(obj, args, ctx) {
        return Article.query()
          .findById(obj.id)
          .then(result => result.$relatedQuery('media'));
      },
    },
    author: {
      type: AccountType,
      description: 'The account of the person who wrote the article.',
      resolve(obj, args, ctx) {
        return Article.query()
          .findById(obj.id)
          .then(result => result.$relatedQuery('author'));
      },
    },
    category: {
      type: CategoryType,
      description: 'Category the article belongs to.',
      resolve(obj, args, ctx) {
        return Article.query()
          .findById(obj.id)
          .then(result => result.$relatedQuery('category'));
      },
    },
  }),
});

export default ArticleType;
