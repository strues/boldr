import { GraphQLNonNull, GraphQLID, GraphQLBoolean } from 'graphql';
import _debug from 'debug';

import slugIt from '../../utils/slugIt';
import Tag from '../../models/Tag';
import Article from '../../models/Article';
import ArticleTag from '../../models/join/ArticleTag';

import ArticleType from '../../schema/type/article';
import EditArticleInput from '../../schema/input/editArticle';
import CreateArticleInput from '../../schema/input/createArticle';

const debug = _debug('boldr:server:gql:article:mutation');

export default {
  createArticle: {
    type: ArticleType,
    description: 'Adds a new article to the database.',
    args: {
      input: {
        type: new GraphQLNonNull(CreateArticleInput),
      },
    },
    async resolve(_, args, context) {
      const newArticle = await Article.query().insert({
        title: args.input.title,
        slug: slugIt(args.input.title),
        excerpt: args.input.excerpt,
        content: args.input.content,
        rawContent: args.input.rawContent,
        image: args.input.image,
        heroImage: args.input.heroImage,
        meta: args.input.meta,
        attachments: args.input.attachments,
        published: args.input.published,
        userId: context.user.id,
        categoryId: args.input.categoryId,
      });
      args.input.tags.map(async tag => {
        const existingTag = await Tag.query()
          .where('name', tag)
          .first();
        if (existingTag) {
          await ArticleTag.query().insert({
            tagId: existingTag.id,
            articleId: newArticle.id,
          });
        } else {
          await newArticle
            .$relatedQuery('tags')
            .insert({ name: tag })
            .skipUndefined();
        }
      });
      // const relatedFeatureImg = await Media.query()
      //   .where('url', args.input.image)
      //   .skipUndefined()
      //   .first();
      // await ArticleMedia.query()
      //   .insert({
      //     mediaId: relatedFeatureImg.id,
      //     articleId: createArticle.id,
      //   })
      //   .skipUndefined();
      return newArticle;
    },
  },
  editArticle: {
    type: ArticleType,
    description: 'Edit an existing article',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The article ID',
      },
      input: {
        type: new GraphQLNonNull(EditArticleInput),
        description: 'The required fields for creating an article.',
      },
    },
    async resolve(_, args) {
      debug(args);
      const updatedArticle = await Article.query().patchAndFetchById(args.id, {
        title: args.input.title,
        slug: slugIt(args.input.title),
        excerpt: args.input.excerpt,
        content: args.input.content,
        rawContent: args.input.rawContent,
        image: args.input.image,
        heroImage: args.input.heroImage,
        meta: args.input.meta,
        published: args.input.published,
        categoryId: args.input.categoryId,
      });
      return updatedArticle;
    },
  },
  deleteArticle: {
    type: GraphQLBoolean,
    description: 'Remove an article from the database',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The article ID',
      },
    },
    resolve(_, args) {
      return Article.query().deleteById(args.id);
    },
  },
};
