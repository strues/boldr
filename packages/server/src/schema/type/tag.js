import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql';
import { globalIdField, name } from '../field/identifier';
import { dateCUD } from '../field/date';
import Tag from '../../models/Tag';
import EntityType from './entity';
import ArticleType from './article';

const TagType = new GraphQLObjectType({
  name: 'Tag',
  description: 'A tag relates content together',
  fields: () => ({
    id: globalIdField(),
    ...name,
    description: {
      type: GraphQLString,
      description: 'A description of the tag',
    },
    articles: {
      type: new GraphQLList(ArticleType),
      description: 'Articles related to the tag',
      resolve(_) {
        return Tag.query()
          .findById(_.id)
          .then(result => result.$relatedQuery('articles'));
      },
    },
    entities: {
      type: new GraphQLList(EntityType),
      description: 'Entities related to the tag',
      resolve(_) {
        return Tag.query()
          .findById(_.id)
          .then(result => result.$relatedQuery('entities'));
      },
    },
    ...dateCUD,
  }),
});

export default TagType;
