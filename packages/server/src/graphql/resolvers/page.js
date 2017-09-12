/* eslint-disable no-unused-vars */
import _debug from 'debug';
import { errorObj } from '../../errors';
import slugIt from '../../utils/slugIt';

const pageResolvers = {
  Query: {
    pages: async (obj, args, context) => {
      const pages = await context.models.Page.query();
      if (pages) {
        return pages;
      }
      throw errorObj({ _error: 'Unable to find any pages.' });
    },
    singlePage: async (obj, { slug }, context) => {
      const page = await context.models.Page
        .query()
        .where({ slug })
        .first();
      if (page) {
        return page;
      }
      throw errorObj({ _error: 'Unable to find a page by that slug.' });
    },
  },
};

export default pageResolvers;
