import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLString } from 'graphql';
import {
  GraphQLEmail,
  GraphQLURL,
  GraphQLLimitedString,
  GraphQLPassword,
  GraphQLDateTime,
  GraphQLUUID,
  GraphQLJSON,
} from '../scalars';
import MenuDetail from '../../models/MenuDetail';
import slugIt from '../../utils/slugIt';
import MenuDetailType, { EditDetailInput } from './menuDetailType';

export default {
  editDetails: {
    type: MenuDetailType,
    description: 'Edit menu details',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The detail ID',
      },
      input: {
        type: new GraphQLNonNull(EditDetailInput),
        description: 'The required fields for editing a detail.',
      },
    },
    async resolve(_, args, context) {
      debug(args);
      const updatedDetail = await MenuDetail.query().patchAndFetchById(args.id, {
        title: args.input.title,
        safeName: slugIt(args.input.title),
        href: args.input.href,
        mobileHref: args.input.mobileHref,
        cssClassname: args.input.cssClassname,
        hasDropdown: JSON.parse(args.input.hasDropdown),
        icon: args.input.icon,
        order: args.input.order,
        children: args.input.children,
      });
      return updatedDetail;
    },
  },
};
