import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql';
import { globalIdField, name, slug } from '../field/identifier';
import { dateCUD } from '../field/date';
import ArticleType from './article';
import CategoryType from './category';
import TagType from './tag';
import EntityType from './entity';

const AllContentType = new GraphQLObjectType({
  name: 'AllContent',
  description: 'A tag relates content together',
  fields: () => ({
    articles: {
      type: new GraphQLList(ArticleType),
    },
    tags: {
      type: TagType,
    },
    entities: {
      type: EntityType,
    },
    categories: {
      type: CategoryType,
    },
  }),
});

export default AllContentType;
