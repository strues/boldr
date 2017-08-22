import { GraphQLBoolean, GraphQLString, GraphQLNonNull, GraphQLInputObjectType } from 'graphql';
import { GraphQLURL, GraphQLJSON } from '../scalars';

const EditArticleInput = new GraphQLInputObjectType({
  name: 'EditArticleInput',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the article',
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The slug / normalized article title.',
    },
    content: {
      type: GraphQLString,
      description: 'html content of the article',
    },
    rawContent: {
      type: GraphQLJSON,
      description: 'Raw JSON of the article',
    },
    excerpt: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Short description of the article',
    },
    featured: {
      type: GraphQLBoolean,
      description: 'True if the article is featured',
    },
    published: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'True if the article is published',
    },
    image: {
      type: GraphQLURL,
      description: 'url of the article feature image',
    },
    backgroundImage: {
      type: GraphQLURL,
      description: 'url of the article background image',
    },
  }),
});
export default EditArticleInput;
