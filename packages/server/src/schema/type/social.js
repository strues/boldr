import { GraphQLID, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { GraphQLURL } from '../scalars';
import { globalIdField } from '../field/identifier';

const SocialType = new GraphQLObjectType({
  name: 'Social',
  fields: () => ({
    id: globalIdField(),
    profileId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the profile the social media accounts belong to.',
    },
    facebookUrl: {
      type: GraphQLURL,
      description: 'The Facebook profile url for the user.',
    },
    twitterUrl: {
      type: GraphQLURL,
      description: 'The Twitter profile url for the user.',
    },
    googleUrl: {
      type: GraphQLURL,
      description: 'The Google profile url for the user.',
    },
    githubUrl: {
      type: GraphQLURL,
      description: 'The GitHub profile url for the user.',
    },
    linkedinUrl: {
      type: GraphQLURL,
      description: 'The LinkedIn profile url for the user.',
    },
    stackoverflowUrl: {
      type: GraphQLURL,
      description: 'The Stackoverflow profile url for the user.',
    },
  }),
});

export default SocialType;
