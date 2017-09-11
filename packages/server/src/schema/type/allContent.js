import { GraphQLObjectType, GraphQLList } from 'graphql';
import ArticleType from './article';
import CategoryType from './category';
import TagType from './tag';
import EntityType from './entity';

const AllContentType = new GraphQLObjectType({
  name: 'AllContent',
  description: 'A query for delivering the maximum amount of content',
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
