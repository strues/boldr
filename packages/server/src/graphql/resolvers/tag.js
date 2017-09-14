/* eslint-disable no-unused-vars */
import _debug from 'debug';
import { errorObj } from '../../errors';
import slugIt from '../../utils/slugIt';

const debug = _debug('boldr:server:graphql:resolvers:tag');

const tagResolvers = {
  Tag: {
    articles: async (obj, args, ctx) => {
      const articles = await ctx.models.Tag
        .query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('articles'));
      if (articles) {
        return articles;
      }
      throw errorObj({ _error: 'Unable to find any tags.' });
    },
    entities: async (obj, args, ctx) => {
      const entities = await ctx.models.Tag
        .query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('entities'));
      if (!entities) {
        throw errorObj({ _error: 'Unable to find any tags.' });
      }
      return entities;
    },
  },
  Query: {
    getTags: async (obj, { limit, offset }, ctx) => {
      const tags = await ctx.models.Tag
        .query()
        .offset(offset)
        .limit(limit)
        .skipUndefined();
      if (!tags) {
        throw errorObj({ _error: 'Unable to find any tags.' });
      }
      return tags;
    },
  },
  Mutation: {
    addTag: async (obj, args, ctx) => {
      const payload = await ctx.models.Tag
        .query()
        .insert({
          name: args.input.name,
          safeName: slugIt(args.input.name),
        })
        .returning('*');
      return payload;
    },
    editTag: async (obj, args, ctx) => {
      debug(args);
      const updatedTag = await ctx.models.Tag.query().patchAndFetchById(args.id, {
        name: args.input.name,
        safeName: slugIt(args.input.name),
      });
      return updatedTag;
    },
    deleteTag: (obj, args, ctx) => {
      return ctx.models.Tag.query().deleteById(args.id);
    },
  },
};

export default tagResolvers;
