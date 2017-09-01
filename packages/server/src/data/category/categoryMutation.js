import { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLError } from 'graphql';
import Category from '../../models/Category';
import slugIt from '../../utils/slugIt';
import CategoryType from '../../schema/type/category';
import CreateCategoryInput from '../../schema/input/createCategory';

export default {
  createCategory: {
    type: CategoryType,
    description: 'Adds a new category to the database.',
    args: {
      input: {
        type: new GraphQLNonNull(CreateCategoryInput),
      },
    },
    async resolve(_, args) {
      try {
        const newCategory = await Category.query().insert({
          name: args.input.name,
          slug: slugIt(args.input.slug),
          icon: args.input.icon,
          description: args.input.description,
        });

        return newCategory;
      } catch (error) {
        throw new GraphQLError(`There was an error creating the category: ${error}`);
      }
    },
  },
};
