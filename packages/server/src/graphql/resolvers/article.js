/* eslint-disable no-unused-vars */
import _debug from 'debug';
import { withFilter } from 'graphql-subscriptions';
import { errorObj } from '../../errors';
import slugIt from '../../utils/slugIt';

const ARTICLE_UPDATED_TOPIC = 'post_updated';

const debug = _debug('boldr:server:graphql:resolvers:article');

const articleResolvers = {
  Article: {
    tags: async (obj, args, ctx) => {
      const tags = await ctx.models.Article
        .query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('tags'));
      if (!tags) {
        throw errorObj({ _error: 'Unable to find any related tags.' });
      }
      return tags;
    },
    media: async (obj, args, ctx) => {
      const media = await ctx.models.Article
        .query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('media'));
      if (!media) {
        throw errorObj({ _error: 'Unable to find any related media.' });
      }
      return media;
    },
    author: async (obj, args, ctx) => {
      const author = await ctx.models.Article
        .query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('author'));
      if (!author) {
        throw errorObj({ _error: 'Unable to find a related author.' });
      }
      return author;
    },
    category: async (obj, args, ctx) => {
      const category = await ctx.models.Article
        .query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('category'));

      if (!category) {
        throw errorObj({ _error: 'Unable to find a related category.' });
      }
      return category;
    },
  },

  Query: {
    articles: async (obj, { offset, limit }, ctx) => {
      const articles = await ctx.models.Article.getArticles(offset, limit);
      if (!articles) {
        throw errorObj({ _error: 'Unable to locate any articles' });
      }
      return articles;
    },
    getArticleBySlug: async (obj, { slug }, ctx) => {
      const article = await ctx.models.Article.getArticleBySlug(slug);
      if (!article) {
        throw errorObj({ _error: 'Unable to locate an articles matching the slug' });
      }
      return article;
    },
    getArticlesForTag: async (obj, { name, offset, limit }, ctx) => {
      const article = await ctx.models.Article.getArticlesByTag(name, offset, limit);
      if (!article) {
        throw errorObj({ _error: 'Unable to locate an articles matching the tag' });
      }
      return article;
    },
  },
  Mutation: {
    createArticle: async (obj, args, ctx) => {
      const newArticle = await ctx.models.Article.query().insert({
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
        status: args.input.status,
        authorId: ctx.user.id,
        categoryId: args.input.categoryId,
      });
      args.input.tags.map(async tag => {
        const existingTag = await ctx.models.Tag
          .query()
          .where('name', tag)
          .first();
        if (existingTag) {
          await ctx.models.ArticleTag.query().insert({
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
      return newArticle;
    },
    editArticle: async (obj, args, ctx) => {
      debug(args);
      const updatedArticle = await ctx.models.Article.query().patchAndFetchById(args.id, {
        title: args.input.title,
        slug: slugIt(args.input.title),
        excerpt: args.input.excerpt,
        content: args.input.content,
        rawContent: args.input.rawContent,
        image: args.input.image,
        heroImage: args.input.heroImage,
        meta: args.input.meta,
        status: args.input.status,
        published: args.input.published,
        categoryId: args.input.categoryId,
      });
      return updatedArticle;
    },
    deleteArticle: (obj, args, ctx) => {
      return ctx.models.Article.query().deleteById(args.id);
    },
  },
  Subscription: {
    articleUpdated(article) {
      return article;
    },
  },
};
export default articleResolvers;
