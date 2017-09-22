/* eslint-disable no-unused-vars */
import _debug from 'debug';
import { errorObj } from '../../errors';

const entityResolvers = {
  Entity: {
    tags: async (obj, args, { models: { Entity } }) => {
      const tags = await Entity.query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('tags'));
      if (!tags) {
        throw errorObj({ _error: 'Unable to locate any entities' });
      }
      return tags;
    },
    contentType: async (obj, args, { models: { Entity } }) => {
      const contentType = await Entity.query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('contentType'));
      if (!contentType) {
        throw errorObj({ _error: 'Unable to locate any entities' });
      }
      return contentType;
    },
    category: async (obj, args, { models: { Entity } }) => {
      const category = await Entity.query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('category'));
      if (!category) {
        throw errorObj({ _error: 'Unable to locate a category related to the entity' });
      }
      return category;
    },
    author: async (obj, args, { models: { Entity } }) => {
      const author = await Entity.query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('category'));
      if (!author) {
        throw errorObj({ _error: 'Unable to locate an author related to the entities' });
      }
      return author;
    },
  },
  Query: {
    entities: async (obj, { offset, limit }, { models: { Entity } }) => {
      const entities = await Entity.query()
        .offset(offset)
        .limit(limit)
        .skipUndefined();
      if (!entities) {
        throw errorObj({ _error: 'Unable to locate any entities' });
      }
      return entities;
    },
  },
};

export default entityResolvers;
