import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import jsonResult from 'boldr-utils/lib/gql/jsonResult';
import { GraphQLEmail, GraphQLURL, GraphQLDateTime, GraphQLUUID, GraphQLJSON } from '../scalars';
import Role from '../../models/Role';
import RoleType from './roleType';

export default {
  getRoles: {
    type: new GraphQLList(RoleType),
    description: 'A query for a listing of all roles',
    async resolve(_, args, context) {
      const roles = await Role.query();
      if (roles) {
        return roles;
      }
      console.log('error');
    },
  },
};
