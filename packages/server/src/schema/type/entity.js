import { GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLID } from 'graphql';
import { GraphQLJSON } from '../scalars';
import { globalIdField, slug } from '../field/identifier';
import { dateCUD } from '../field/date';

import Entity from '../../models/Entity';
import CONTENT_STATUS from '../enum/contentStatus';
import AccountType from './account';
import TagType from './tag';
import CategoryType from './category';
import ContentType from './contentType';

const EntityType = new GraphQLObjectType({
  name: 'Entity',
  description: 'A content item',
  fields: () => ({
    id: globalIdField(),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the entity',
    },
    ...slug,
    content: {
      type: GraphQLString,
      description: 'html content of the entity',
    },
    rawContent: {
      type: GraphQLJSON,
      description: 'Raw JSON of the entity',
    },
    excerpt: {
      type: GraphQLString,
      description: 'Short description of the entity',
    },
    meta: {
      type: GraphQLJSON,
    },
    status: {
      type: CONTENT_STATUS,
      description: 'The publish status of content',
    },
    image: {
      type: GraphQLString,
      description: 'url of the entity main image',
    },
    authorId: {
      type: GraphQLID,
      description: 'The id of the creator',
    },
    contentTypeId: {
      type: GraphQLID,
      description: 'The content type id',
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
        return Entity.query()
          .findById(_.id)
          .then(result => result.$relatedQuery('tags'));
      },
    },
    contentType: {
      type: ContentType,
      resolve(obj, args, ctx) {
        return Entity.query()
          .findById(_.id)
          .then(result => result.$relatedQuery('contentType'));
      },
    },
    category: {
      type: CategoryType,
      resolve(obj, args, ctx) {
        return Entity.query()
          .findById(_.id)
          .then(result => result.$relatedQuery('category'));
      },
    },
    author: {
      type: AccountType,
      description: 'User who created the entity.',
    },
  }),
});

export default EntityType;
