import {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
} from 'graphql';
import { GraphQLEmail, GraphQLURL, GraphQLDateTime, GraphQLUUID, GraphQLJSON } from '../scalars';
import Tag from '../../models/Tag';
import ArticleType from '../article/articleType';

const TagType = new GraphQLObjectType({
  name: 'Tag',
  description: 'A tag relates content together',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The tag id (uuid)',
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
      description: 'Articles related to the tag',
      resolve(_, args, ctx) {
        return Tag.query().findById(_.id).then(result => result.$relatedQuery('articles'));
      },
    },
  }),
});

export const TagInput = new GraphQLInputObjectType({
  name: 'TagInput',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the tag',
    },
    description: {
      type: GraphQLString,
      description: 'A description of the tag.',
    },
  }),
});

export default TagType;
