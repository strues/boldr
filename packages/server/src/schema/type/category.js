import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql';
import { globalIdField, name, slug } from '../field/identifier';
import { dateCUD } from '../field/date';
import Category from '../../models/Category';
import EntityType from './entity';
import ArticleType from './article';

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'A category groups content together',
  fields: () => ({
    id: globalIdField(),
    ...name,
    ...slug,
    icon: {
      type: GraphQLString,
      description: 'An icon to use for the category',
    },
    description: {
      type: GraphQLString,
      description: 'A description of the category',
    },
    ...dateCUD,

    entities: {
      type: new GraphQLList(EntityType),
      description: 'Entities belonging to the category',
      resolve(root) {
        return Category.query()
          .findById(root.id)
          .then(result => result.$relatedQuery('entities'));
      },
    },
    articles: {
      type: new GraphQLList(ArticleType),
      description: 'Articles belonging to the category',
      resolve(root) {
        return Category.query()
          .findById(root.id)
          .then(result => result.$relatedQuery('articles'));
      },
    },
  }),
});

export default CategoryType;
