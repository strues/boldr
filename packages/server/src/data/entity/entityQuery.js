import { GraphQLList, GraphQLInt, GraphQLString } from 'graphql';
import EntityType from '../../schema/type/entity';
import ContentType from '../../schema/type/contentType';
import Entity from '../../models/Entity';
import ContentT from '../../models/ContentType';
import { errorObj } from '../../errors';

export default {
  entities: {
    type: new GraphQLList(EntityType),
    description: 'Returns all content entities from the database..',
    args: {
      offset: {
        type: GraphQLInt,
        description: 'The number of entities to offset',
      },
      limit: {
        type: GraphQLInt,
        description: 'The maximum number of entities to return at a time.',
      },
    },
    // eslint-disable-next-line
    async resolve(_, { offset, limit }, context) {
      const entities = await Entity.query()
        .offset(offset)
        .limit(limit)
        .skipUndefined();
      if (entities) {
        return entities;
      }
      throw errorObj({ _error: 'Unable to locate any entities' });
    },
  },
};
