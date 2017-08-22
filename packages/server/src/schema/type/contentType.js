import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql';
import { globalIdField, name, slug } from '../field/identifier';
import { dateCUD } from '../field/date';
import ContentT from '../../models/ContentType';
import EntityType from './article';

const ContentType = new GraphQLObjectType({
  name: 'ContentType',
  description: 'A tag relates content together',
  fields: () => ({
    id: globalIdField(),
    ...name,
    ...slug,
    icon: {
      type: GraphQLString,
      description: 'An icon to use for the content type',
    },
    description: {
      type: GraphQLString,
      description: 'A description of the tag',
    },
    entities: {
      type: new GraphQLList(EntityType),
      description: 'Articles related to the tag',
      resolve(_) {
        return ContentT.query().findById(_.id).then(result => result.$relatedQuery('entities'));
      },
    },
    ...dateCUD,
  }),
});

export default ContentType;
