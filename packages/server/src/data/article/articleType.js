import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
} from 'graphql';
import { GraphQLEmail, GraphQLURL, GraphQLDateTime, GraphQLUUID, GraphQLJSON } from '../scalars';
import { UserType } from '../user';
import Article from '../../models/Article';
import MediaType from '../media/mediaType';
import TagType from '../tag/tagType';

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  description: 'A blog post or article',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The identifier for the article',
    },
    title: {
      type: GraphQLString,
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
      type: GraphQLString,
      description: 'Short description of the article',
    },
    featured: {
      type: GraphQLBoolean,
      description: 'True if the article is featured',
    },
    published: {
      type: GraphQLBoolean,
      description: 'True if the article is published',
    },
    image: {
      type: GraphQLString,
      description: 'url of the article feature image',
    },
    userId: {
      type: GraphQLID,
      description: 'True if the article is published',
    },
    createdAt: {
      type: GraphQLDateTime,
      description: 'The timestamp when the article was created',
    },
    updatedAt: {
      type: GraphQLDateTime,
      description: 'The timestamp when the article was last updated',
    },
    deletedAt: {
      type: GraphQLDateTime,
      description: 'The timestamp when the article was deleted',
    },
    tags: {
      type: new GraphQLList(TagType),
      description: 'Tags relating articles together',
      resolve(_, args, ctx) {
        return Article.query().findById(_.id).then(result => result.$relatedQuery('tags'));
      },
    },
    media: {
      type: new GraphQLList(MediaType),
      description: 'Media uploaded with the article',
    },
    author: {
      type: UserType,
      description: 'Users belonging to a role.',
    },
  }),
});

export const CreateArticleInput = new GraphQLInputObjectType({
  name: 'CreateArticleInput',
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
      type: new GraphQLNonNull(GraphQLString),
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
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'True if the article is featured',
    },
    published: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'True if the article is published',
    },
    featureImage: {
      type: GraphQLString,
      description: 'url of the article feature image',
    },
    backgroundImage: {
      type: GraphQLString,
      description: 'url of the article background image',
    },
    tags: {
      type: GraphQLString,
      description: 'Tags relating articles together',
    },
  }),
});
export const EditArticleInput = new GraphQLInputObjectType({
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
      type: new GraphQLNonNull(GraphQLString),
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
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'True if the article is featured',
    },
    published: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'True if the article is published',
    },
    featureImage: {
      type: GraphQLURL,
      description: 'url of the article feature image',
    },
    backgroundImage: {
      type: GraphQLURL,
      description: 'url of the article background image',
    },
  }),
});
export default ArticleType;
