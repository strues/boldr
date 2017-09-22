/* eslint-disable no-unused-vars */
import _debug from 'debug';
import { errorObj } from '../../errors';
import slugIt from '../../utils/slugIt';

const debug = _debug('boldr:server:graphql:resolvers:category');

const contentResolvers = {
  Query: {
    contentRoot: async (obj, args, { models: { Category, Tag, ContentType } }) => {
      const categories = await Category.query().returning('*');
      const tags = await Tag.query().returning('*');
      const contentTypes = await ContentType.query().returning('*');
      if (!categories) {
        throw errorObj({ _error: 'Unable to find categories.' });
      }
      if (!tags) {
        throw errorObj({ _error: 'Unable to find tags.' });
      }
      if (!contentTypes) {
        throw errorObj({ _error: 'Unable to find contentTypes.' });
      }
      const contentRoot = {
        categories,
        tags,
        contentTypes,
      };
      return contentRoot;
    },
  },
};

export default contentResolvers;
