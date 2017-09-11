import { GraphQLObjectType, GraphQLList } from 'graphql';
import { globalIdField, name, safeName } from '../field/identifier';
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
    ...safeName,
    ...dateCUD,

    articles: {
      type: new GraphQLList(ArticleType),
      description: 'Articles related to the tag',
      resolve(obj) {
        return Tag.query()
          .findById(obj.id)
          .then(result => result.$relatedQuery('articles'));
      },
    },
    entities: {
      type: new GraphQLList(EntityType),
      description: 'Entities related to the tag',
      resolve(obj) {
        return Tag.query()
          .findById(obj.id)
          .then(result => result.$relatedQuery('entities'));
      },
    },
  }),
});

export default TagType;
