import { GraphQLNonNull, GraphQLID } from 'graphql';

import MenuDetail from '../../models/MenuDetail';
import slugIt from '../../utils/slugIt';
import EditDetailInput from '../../schema/input/editMenuDetail';
import MenuDetailType from '../../schema/type/menuDetail';

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
    async resolve(_, args) {
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
