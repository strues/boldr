import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
} from 'graphql';
import { GraphQLJSON } from '../scalars';

const CreateArticleInput = new GraphQLInputObjectType({
  name: 'CreateArticleInput',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the article',
    },
    slug: {
      type: GraphQLString,
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
      type: GraphQLString,
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
      type: GraphQLString,
      description: 'url of the article feature image',
    },
    heroImage: {
      type: GraphQLString,
      description: 'url of the article background image',
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      description: 'Tags relating articles together',
    },
    categoryId: {
      type: GraphQLID,
      description: 'Id of the category',
    },
  }),
});

export default CreateArticleInput;
