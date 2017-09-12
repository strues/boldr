/* eslint-disable no-unused-vars */
import _debug from 'debug';
import { errorObj } from '../../errors';

const menuDetailResolvers = {
  Query: {
    details: async (obj, args, context) => {
      const details = await context.models.MenuDetail
        .query()
        .eager('[menu,dropdown,dropdownItems]');
      if (!details) {
        throw errorObj({ _error: 'Unable to find any links' });
      }
      return details;
    },
  },
  Mutation: {
    editDetails: async (obj, args, context) => {
      debug(args);
      const updatedDetail = await MenuDetail.query().patchAndFetchById(args.id, {
        title: args.input.title,
        safeName: slugIt(args.input.title),
        href: args.input.href,
        cssClassname: args.input.cssClassname,
        hasDropdown: JSON.parse(args.input.hasDropdown),
        isDropdown: JSON.parse(args.input.isDropdown),
        icon: args.input.icon,
        order: args.input.order,
      });
      return updatedDetail;
    },
  },
};

export default menuDetailResolvers;
