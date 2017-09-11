import { GraphQLString, GraphQLInputObjectType } from 'graphql';
import { GraphQLURL } from '../scalars';

const EditProfileInput = new GraphQLInputObjectType({
  name: 'EditProfileInput',
  fields: () => ({
    username: {
      type: GraphQLString,
      description: 'The username for the new user',
    },
    website: {
      type: GraphQLURL,
      description: 'The website of the user',
    },
    firstName: {
      type: GraphQLString,
      description: 'The first name of the user',
    },
    lastName: {
      type: GraphQLString,
      description: 'The last name associated with the user',
    },
    bio: {
      type: GraphQLString,
      description: 'Information about the user',
    },
    avatarUrl: {
      type: GraphQLURL,
      description: "url of user's avatar picture",
    },
    profileImage: {
      type: GraphQLURL,
      description: "Url for the user's profile background image",
    },
    location: {
      type: GraphQLString,
      description: 'Location the user lives',
    },
  }),
});

export default EditProfileInput;
