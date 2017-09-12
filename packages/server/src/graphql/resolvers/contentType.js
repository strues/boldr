/* eslint-disable no-unused-vars */
import _debug from 'debug';
import { errorObj } from '../../errors';

const contentTypeResolvers = {
  ContentType: {
    entities: async (obj, args, { models: { ContentType } }) => {
      const entities = await ContentType.query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('entities'));
      if (!entities) {
        throw errorObj({ _error: 'Unable to find entities related to the content type.' });
      }
      return entities;
    },
  },
  Query: {
    contentTypes: async (obj, args, { models: { ContentType } }) => {
      const contentTypes = await ContentType.query().returning('*');
      if (!contentTypes) {
        throw errorObj({ _error: 'Unable to find contentTypes.' });
      }

      return contentTypes;
    },
    contentType: async (obj, { id }, { models: { ContentType } }) => {
      const contentType = await ContentType.query()
        .findById(id)
        .eager('[entities]');
      if (!contentType) {
        throw errorObj({ _error: 'Unable to find a contentType.' });
      }

      return contentType;
    },
    allContent: async (obj, args, { models: { Article, Category, Tag } }) => {
      const allContent = {
        articles: await Article.query(),
        tags: await Tag.query(),
        categories: await Category.query(),
      };
      return allContent;
    },
  },
  Mutation: {
    createContentType: async (obj, args, { models: { ContentType } }) => {
      const newContentType = await ContentType.query().insert({
        name: args.input.name,
        slug: slugIt(args.input.slug),
        icon: args.input.icon,
        description: args.input.description,
      });

      return newContentType;
    },
  },
};

export default contentTypeResolvers;
