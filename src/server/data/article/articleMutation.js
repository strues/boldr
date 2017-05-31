import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import { GraphQLUUID } from '../scalars';
import slugIt from '../../utils/slugIt';
import Tag from '../../models/Tag';
import User from '../../models/User';
import Article from '../../models/Article';
import Media from '../../models/Media';
import ArticleTag from '../../models/join/ArticleTag';
import ArticleMedia from '../../models/join/ArticleMedia';
import ArticleType, { CreateArticleInput } from './articleType';

export default {
  createArticle: {
    type: ArticleType,
    description: 'Adds a new article to the database.',
    args: {
      article: {
        type: new GraphQLNonNull(CreateArticleInput),
      },
    },
    async resolve(_, args, context) {
      const newArticle = await Article.query().insert({
        title: args.article.title,
        slug: slugIt(args.article.title),
        excerpt: args.article.excerpt,
        content: args.article.content,
        rawContent: args.article.rawContent,
        featureImage: args.article.featureImage,
        backgroundImage: args.article.backgroundImage,
        meta: args.article.meta,
        attachments: args.article.attachments,
        published: args.article.published,
        userId: context.user.id,
      });

      args.article.tags.map(async tag => {
        console.log(tag);
        const existingTag = await Tag.query()
          .where('name', tag)
          .first()
          .skipUndefined();
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
      const relatedFeatureImg = await Media.query()
        .where('url', args.article.featureImage)
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
};
