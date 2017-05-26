import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
} from 'graphql';
import {
  GraphQLEmail,
  GraphQLURL,
  GraphQLDateTime,
  GraphQLUUID,
  GraphQLJSON,
} from '../scalars';

import ArticleType from '../article/articleType';

const TagType = new GraphQLObjectType({
  name: 'Tag',
  description: 'A tag relates content together',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The tag id',
    },
    uuid: {
      type: GraphQLUUID,
      description: 'The uuid of the tag',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the tag',
    },
    description: {
      type: GraphQLString,
      description: 'A description of the tag',
    },
    articles: {
      type: new GraphQLList(ArticleType),
      description: 'Articles related to the tag.',
    },
  }),
});

export default TagType;
