import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLString } from 'graphql';
import _debug from 'debug';
import { GraphQLUUID } from '../scalars';
import slugIt from '../../utils/slugIt';
import Tag from '../../models/Tag';
import User from '../../models/User';
import Article from '../../models/Article';
import Media from '../../models/Media';
import ArticleTag from '../../models/join/ArticleTag';
import ArticleMedia from '../../models/join/ArticleMedia';
import ArticleType, { CreateArticleInput, EditArticleInput } from './articleType';

const debug = _debug('boldr:server:articleMutation');

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
        featureImage: args.input.featureImage,
        backgroundImage: args.input.backgroundImage,
        meta: args.input.meta,
        attachments: args.input.attachments,
        published: args.input.published,
        userId: context.user.id,
      });

      args.input.tags.map(async tag => {
        console.log(tag);
        const existingTag = await Tag.query().where('name', tag).first().skipUndefined();
        if (existingTag) {
          await ArticleTag.query().insert({
            tagId: existingTag.id,
            articleId: newArticle.id,
          });
        } else {
          await newArticle.$relatedQuery('tags').insert({ name: tag }).skipUndefined();
        }
      });
      const relatedFeatureImg = await Media.query()
        .where('url', args.input.featureImage)
        .first()
        .skipUndefined();
      await ArticleMedia.query()
        .insert({
          mediaId: relatedFeatureImg.id,
          articleId: createArticle.id,
        })
        .skipUndefined();
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
    async resolve(_, args, context) {
      debug(args);
      const updatedArticle = await Article.query().patchAndFetchById(args.id, {
        title: args.input.title,
        slug: slugIt(args.input.title),
        excerpt: args.input.excerpt,
        content: args.input.content,
        rawContent: args.input.rawContent,
        featureImage: args.input.featureImage,
        backgroundImage: args.input.backgroundImage,
        meta: args.input.meta,
        attachments: args.input.attachments,
        published: args.input.published,
      });
      return updatedArticle;
    },
  },
  deleteArticle: {
    type: ArticleType,
    description: 'Remove an article from the database',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
        description: 'The article ID',
      },
    },
    async resolve(_, args, context) {
      const removedArticle = await Article.query().deleteById(args.id);
      return removedArticle;
    },
  },
};
