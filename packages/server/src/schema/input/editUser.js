import { GraphQLString, GraphQLInputObjectType } from 'graphql';
import { GraphQLEmail } from '../scalars';

const EditUserInput = new GraphQLInputObjectType({
  name: 'EditUserInput',
  fields: () => ({
    email: {
      type: GraphQLEmail,
      description: 'The email address of the account to login to.',
    },
    location: {
      type: GraphQLString,
      description: 'Where the user is from.',
    },
    bio: {
      type: GraphQLString,
      description: 'Information about the user.',
    },
    username: {
      type: GraphQLString,
      description: 'The username for the new user',
    },
    firstName: {
      type: GraphQLString,
      description: 'The first name of the user.',
    },
    lastName: {
      type: GraphQLString,
      description: 'The last name of the user.',
    },
  }),
});

export default EditUserInput;
