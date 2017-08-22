import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { GraphQLUUID } from '../scalars';

export const globalIdField = () => ({
  type: new GraphQLNonNull(GraphQLID),
  description: 'Unique identifier for the object.',
});

export const id = {
  id: {
    type: GraphQLID,
    description: 'Unique identifier for the object.',
  },
};

export const uuid = {
  uuid: {
    type: GraphQLUUID,
    description:
      'A UUID (Universal Unique Identifier) is a 128-bit number used to uniquely identify some object or entity.',
  },
};

export const name = {
  name: {
    type: GraphQLString,
    description: 'A name for the object.',
  },
};
export const safeName = {
  safeName: {
    type: GraphQLString,
    description: 'A normalized copy of the object name.',
  },
};
export const title = {
  title: {
    type: GraphQLString,
    description: 'Title or name for the object.',
  },
};

export const slug = {
  slug: {
    type: GraphQLString,
    description: 'An alphanumeric identifier for the object unique to its type.',
  },
};
