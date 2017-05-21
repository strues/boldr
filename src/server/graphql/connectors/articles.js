import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uuid from 'uuid';
import { transaction } from 'objection';
import _debug from 'debug';
import config from '../../config';
import slugIt from '../../utils/slugIt';
import User from '../../models/User';
import ArticleTag from '../../models/join/ArticleTag';
import ArticleMedia from '../../models/join/ArticleMedia';
import Tag from '../../models/Tag';
import Article from '../../models/Tag';
import Media from '../../models/Media';
import { BadRequest } from '../../core/errors';

const debug = _debug('boldr:server:articlsConnector');

export default class ArticlesConnector {
  static createArticle(args, context) {
    async function createArticleTagRelation(existingTag, newArticle) {
      try {
        await ArticleTag.query().insert({
          tagId: existingTag.id,
          articleId: newArticle.id,
        });
      } catch (error) {
        debug(error);
      }
    }
    const articleSlug = slugIt(args.title);
    return new Promise(async (resolve, reject) => {
      const newArticle = await Article.query().insert({
        title: args.title,
        slug: articleSlug,
        excerpt: args.excerpt,
        content: args.content,
        rawContent: args.rawContent,
        featureImage: args.featureImage,
        backgroundImage: args.backgroundImage,
        meta: args.meta,
        attachments: args.attachments,
        published: args.published,
        userId: context.user.id,
      });
      const reqTags = args.tags;

      reqTags.map(async tag => {
        debug(tag);
        const existingTag = await Tag.query()
          .where('name', tag)
          .first()
          .skipUndefined();
        if (existingTag) {
          debug('existingTag', existingTag);
          await createArticleTagRelation(existingTag, newArticle);
        } else {
          debug('tag', tag);
          await newArticle
            .$relatedQuery('tags')
            .insert({ name: tag })
            .skipUndefined();
        }
      });
      const relatedFeatureImg = await Media.query()
        .where('url', args.featureImage)
        .first()
        .skipUndefined();
      await ArticleMedia.query()
        .insert({
          mediaId: relatedFeatureImg.id,
          articleId: newArticle.id,
        })
        .skipUndefined();
      return resolve(newArticle);
    });
  }
}
