import { GraphQLString } from 'graphql';
import { GraphQLDateTime } from '../scalars';

export const dateCUD = {
  deletedAt: {
    type: GraphQLDateTime,
    description: 'The timestamp when the object was deleted',
  },
  updatedAt: {
    type: GraphQLDateTime,
    description: 'The timestamp when the object was last updated',
  },
  createdAt: {
    type: GraphQLDateTime,
    description: 'The timestamp when the object was created',
  },
};

export const dateCU = {
  updatedAt: {
    type: GraphQLDateTime,
    description: 'The timestamp when the object was last updated',
  },
  createdAt: {
    type: GraphQLDateTime,
    description: 'The timestamp when the object was created',
  },
};
