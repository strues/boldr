import { GraphQLList, GraphQLString, GraphQLNonNull, GraphQLOGraphQLID } from 'graphql';
import jsonResult from 'boldr-utils/lib/gql/jsonResult';
import { GraphQLEmail, GraphQLURL, GraphQLDateTime, GraphQLUUID, GraphQLJSON } from '../scalars';
import Page from '../../models/Page';
import PageType from './pageType';

export default {
  pages: {
    type: new GraphQLList(PageType),
    description: 'A query for a listing of all pages',
    async resolve(_, args, context) {
      const pages = await Page.query();
      if (pages) {
        return pages;
      }
      console.log('error');
    },
  },
  singlePage: {
    type: PageType,
    description: 'A query for a single page',
    args: {
      slug: { type: GraphQLString },
    },
    async resolve(_, { slug }, context) {
      const page = await Page.query().where({ slug }).first();
      if (page) {
        return page;
      }
      console.log('error');
    },
  },
};
