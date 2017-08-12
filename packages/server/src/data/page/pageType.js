import { GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLID } from 'graphql';
import { GraphQLJSON } from '../scalars';

const PageType = new GraphQLObjectType({
  name: 'Page',
  description: 'Page of the website',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: "The page's id (uuid)",
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the page',
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Normalized version of the page title',
    },
    url: {
      type: GraphQLString,
      description: 'A URL to access the page',
    },
    meta: {
      type: GraphQLJSON,
      description: 'Page meta data',
    },
    blocks: {
      type: GraphQLJSON,
      description: 'Page content blocks',
    },
    markup: {
      type: GraphQLString,
      description: 'Page html markup',
    },
  }),
});

export default PageType;
