import { GraphQLList } from 'graphql';
import { errorObj } from '../../errors';
import Role from '../../models/Role';
import RoleType from '../../schema/type/role';

export default {
  getRoles: {
    type: new GraphQLList(RoleType),
    description: 'A query for a listing of all roles',
    async resolve() {
      const roles = await Role.query();
      if (roles) {
        return roles;
      }
      throw errorObj({ _error: 'Unable to find roles.' });
    },
  },
};
