import { GraphQLList, GraphQLString } from 'graphql';
import Page from '../../models/Page';
import { errorObj } from '../../errors';
import PageType from '../../schema/type/page';

export default {
  pages: {
    type: new GraphQLList(PageType),
    description: 'A query for a listing of all pages',
    async resolve() {
      const pages = await Page.query();
      if (pages) {
        return pages;
      }
      throw errorObj({ _error: 'Unable to find any pages.' });
    },
  },
  singlePage: {
    type: PageType,
    description: 'A query for a single page',
    args: {
      slug: { type: GraphQLString },
    },
    async resolve(_, { slug }) {
      const page = await Page.query()
        .where({ slug })
        .first();
      if (page) {
        return page;
      }
      throw errorObj({ _error: 'Unable to find a page by that slug.' });
    },
  },
};
