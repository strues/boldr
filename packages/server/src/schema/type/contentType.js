import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql';
import { globalIdField, name, slug } from '../field/identifier';
import { dateCUD } from '../field/date';
import ContentT from '../../models/ContentType';
import EntityType from './article';

const ContentType = new GraphQLObjectType({
  name: 'ContentType',
  description: 'Defines a class of entities.',
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
      description: 'Information regarding what the content type does.',
    },
    entities: {
      type: new GraphQLList(EntityType),
      description:
        'Entities are instances of content types. For example ContentType of Portfolio would have Projects as entities.',
      resolve(obj) {
        return ContentT.query()
          .findById(obj.id)
          .then(result => result.$relatedQuery('entities'));
      },
    },
    ...dateCUD,
  }),
});

export default ContentType;
