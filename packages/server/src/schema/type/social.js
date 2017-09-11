import { GraphQLID, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { GraphQLURL } from '../scalars';
import { globalIdField } from '../field/identifier';

const SocialType = new GraphQLObjectType({
  name: 'Social',
  description: 'Social media portion of a profile for an account. ',
  fields: () => ({
    id: globalIdField(),
    profileId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the profile the social media accounts belong to.',
    },
    facebookUrl: {
      type: GraphQLURL,
      description: 'Facebook profile url.',
    },
    twitterUrl: {
      type: GraphQLURL,
      description: 'Twitter profile url.',
    },
    googleUrl: {
      type: GraphQLURL,
      description: 'Google plus profile url.',
    },
    githubUrl: {
      type: GraphQLURL,
      description: 'GitHub profile url.',
    },
    linkedinUrl: {
      type: GraphQLURL,
      description: 'LinkedIn profile url.',
    },
    stackoverflowUrl: {
      type: GraphQLURL,
      description: 'Stackoverflow profile url.',
    },
  }),
});

export default SocialType;
