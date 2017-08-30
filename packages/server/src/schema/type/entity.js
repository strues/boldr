import { GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLID } from 'graphql';
import { GraphQLJSON } from '../scalars';
import { globalIdField, slug } from '../field/identifier';
import { dateCUD } from '../field/date';

import Entity from '../../models/Entity';
import CONTENT_STATUS from '../enum/contentStatus';
import UserType from './user';
import TagType from './tag';
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
    userId: {
      type: GraphQLID,
      description: 'The id of the creator',
    },
    ctId: {
      type: GraphQLID,
      description: 'The content type id',
    },
    ...dateCUD,
    tags: {
      type: new GraphQLList(TagType),
      description: 'Tags relating articles together',
      // eslint-disable-next-line
      resolve(_, args, ctx) {
        return Entity.query()
          .findById(_.id)
          .then(result => result.$relatedQuery('tags'));
      },
    },
    contentType: {
      type: ContentType,
      resolve(_, args, ctx) {
        return Entity.query()
          .findById(_.id)
          .then(result => result.$relatedQuery('contentType'));
      },
    },

    author: {
      type: UserType,
      description: 'User who created the entity.',
    },
  }),
});

export default EntityType;
