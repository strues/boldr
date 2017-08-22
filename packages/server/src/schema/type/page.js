import { GraphQLString, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { GraphQLJSON } from '../scalars';
import { globalIdField, slug } from '../field/identifier';
import { dateCUD } from '../field/date';

const PageType = new GraphQLObjectType({
  name: 'Page',
  description: 'Page of the website',
  fields: () => ({
    id: globalIdField(),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the page',
    },
    ...slug,
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
    ...dateCUD,
  }),
});

export default PageType;
