/* eslint-disable no-unused-vars */
import _debug from 'debug';
import slugIt from '@boldr/utils/lib/strings/slugIt';
import { errorObj } from '../../errors';

const debug = _debug('boldr:server:graphql:resolvers:category');

const categoryResolvers = {
  Category: {
    entities: async (obj, args, { models: { Category } }) => {
      const entities = await Category.query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('entities'));
      if (entities) {
        return entities;
      }
      throw errorObj({ _error: 'Unable to find categories.' });
    },
    articles: async (obj, args, { models: { Category } }) => {
      const articles = await Category.query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('articles'));
      if (articles) {
        return articles;
      }
      throw errorObj({ _error: 'Unable to find categories.' });
    },
  },
  Query: {
    categories: async (obj, args, { models: { Category } }) => {
      const categories = await Category.query().returning('*');
      if (!categories) {
        throw errorObj({ _error: 'Unable to find categories.' });
      }

      return categories;
    },
    category: async (obj, { id }, { models: { Category } }) => {
      const category = await Category.query()
        .findById(id)
        .eager('[entities,articles]');
      if (!category) {
        throw errorObj({ _error: 'Unable to find a category.' });
      }

      return category;
    },
  },
  Mutation: {
    createCategory: async (obj, args, { models: { Category } }) => {
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

export default categoryResolvers;
