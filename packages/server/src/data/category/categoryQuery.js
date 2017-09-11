import { GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';
import Category from '../../models/Category';
import { errorObj } from '../../errors';
import CategoryType from '../../schema/type/category';

export default {
  categories: {
    type: new GraphQLList(CategoryType),
    description: 'A query for a listing of all categories',
    async resolve() {
      const categories = await Category.query().returning('*');
      if (!categories) {
        throw errorObj({ _error: 'Unable to find categories.' });
      }

      return categories;
    },
  },
  category: {
    type: CategoryType,
    description: 'A query for a single category',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The id of the requested category',
      },
    },
    async resolve(obj, { id }) {
      const category = await Category.query()
        .findById(id)
        .eager('[entities,articles]');
      if (!category) {
        throw errorObj({ _error: 'Unable to find a category.' });
      }

      return category;
    },
  },
};
