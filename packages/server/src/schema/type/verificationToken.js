import { GraphQLBoolean, GraphQLString, GraphQLObjectType, GraphQLID } from 'graphql';
import { dateCU } from '../field/date';
import { globalIdField } from '../field/identifier';

const VerificationTokenType = new GraphQLObjectType({
  name: 'VerificationToken',
  description: 'Account verification token for a user',
  fields: () => ({
    id: globalIdField(),
    ip: {
      type: GraphQLString,
      description: 'The ip address of the person performing the reset',
    },
    token: {
      type: GraphQLString,
      description: 'The reset token',
    },
    used: {
      type: GraphQLBoolean,
      description: 'True if the token has been used before.',
    },
    userId: {
      type: GraphQLID,
      description: 'The IP address of the blocked user',
    },
    ...dateCU,
  }),
});

export default VerificationTokenType;
