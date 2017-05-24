import invokeMap from 'lodash/invokeMap';
import isArray from 'lodash/isArray';
import { Kind } from 'graphql/language';
import Attachment from '../models/Attachment';
import Article from '../models/Article';
import Tag from '../models/Tag';
import User from '../models/User';
import Media from '../models/Media';
import MediaType from '../models/MediaType';
import Role from '../models/Role';
import Menu from '../models/Menu';
import MenuDetail from '../models/MenuDetail';
import Setting from '../models/Setting';
import Social from '../models/Social';
import ArticlesConnector from './connectors/articles';
import UsersConnector from './connectors/users';
import {
  GraphQLEmail,
  GraphQLURL,
  GraphQLPassword,
  GraphQLUUID,
} from './scalars/scalars';

const debug = require('debug')('boldr:resolvers');

const firstResult = a => a[0];
const jsonResult = a => {
  return isArray(a) ? invokeMap(a, 'toJSON') : a.toJSON();
};

export default {
  Article: {
    author(obj) {
      return User.query()
        .where({ id: obj.userId })
        .then(firstResult)
        .then(jsonResult);
    },

    tags(obj) {
      return Article.query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('tags'))
        .then(jsonResult);
    },

    media(obj) {
      return Media.query().where({ articleId: obj.id }).then(jsonResult);
    },
  },

  Tag: {
    articles(obj) {
      return Tag.query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('articles'))
        .then(jsonResult);
    },
  },
  Menu: {
    details(obj) {
      return Menu.query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('details'))
        .then(jsonResult);
    },
  },

  User: {
    articles(obj) {
      return Article.getArticlesByUserId(obj.id);
    },
    socialMedia(obj) {
      return User.query()
        .findById(obj.id)
        .then(result => result.$relatedQuery('socialMedia'))
        .then(jsonResult);
    },
  },

  RootQuery: {
    // articles
    articles(obj, args, context) {
      const { offset, limit } = args;

      debug('GraphQL.Resolvers.Query.articles', offset, limit, context);
      return Article.getArticles(offset, limit).then(jsonResult);
    },

    articlesByUser(obj, args) {
      const { username } = args;

      debug('GraphQL.Resolvers.Query.articlesByUser', username);

      return Article.getArticlesByUsername(username).then(jsonResult);
    },

    articlesByTag(obj, args) {
      const { name, offset, limit } = args;

      debug('GraphQL.Resolvers.Query.articlesByTag', name, offset, limit);

      return Article.getArticlesByTag(name, offset, limit).then(jsonResult);
    },

    articleById(obj, args) {
      debug('GraphQL.Resolvers.Query.articlesById');
      return Article.getArticleById(args.id).then(jsonResult);
    },

    articleBySlug(obj, args) {
      debug('GraphQL.Resolvers.Query.articleBySlug');

      return Article.getArticleBySlug(args.slug).then(jsonResult);
    },
    // attachments
    attachments(obj, args) {
      const { offset, limit } = args;
      debug('GraphQL.Resolvers.Query.attachments');

      return Attachment.listAttachments(offset, limit).then(jsonResult);
    },
    // media
    listMedia(obj, args) {
      const { offset, limit } = args;
      debug('GraphQL.Resolvers.Query.listMedia');

      return Media.listMedia(offset, limit).then(jsonResult);
    },
    mediaById(obj, args) {
      const { id } = args;

      debug('GraphQL.Resolvers.Query.mediaById', args);
      return Media.getMediaById(id).then(jsonResult);
    },
    mediaTypes(obj, args) {
      debug('GraphQL.Resolvers.Query.mediaById', args);
      return MediaType.listTypes().then(jsonResult);
    },
    // tags
    getTags(obj, args) {
      debug('GraphQL.Resolvers.Query.tags');
      const { offset, limit } = args;
      return Tag.getTags(offset, limit).then(jsonResult);
    },
    // user related
    currentUser(obj, args, context) {
      return context.user || null;
    },

    users(obj, args) {
      const { offset, limit } = args;
      debug('GraphQL.Resolvers.Query.users');

      return User.getUsers(offset, limit).then(jsonResult);
    },

    userById(obj, args) {
      debug('GraphQL.Resolvers.Query.userById');

      return User.getUserById(args.id).then(jsonResult);
    },

    userByEmail(obj, args) {
      debug('GraphQL.Resolvers.Query.userByEmail');

      return User.getUserByEmail(args.email).then(jsonResult);
    },

    userByUsername(obj, args) {
      debug('GraphQL.Resolvers.Query.userByUsername');
      return User.getUserByUsername(args.username).then(jsonResult);
    },

    menus(obj, args) {
      debug('GraphQL.Resolvers.Query.menus');

      return Menu.getMenus().then(jsonResult);
    },
    menuById(obj, args) {
      debug('GraphQL.Resolvers.Query.menus');

      return Menu.getById(args.id).then(jsonResult);
    },
    settings(obj, args) {
      debug('GraphQL.Resolvers.Query.settings');

      return Setting.query().then(jsonResult);
    },
  },
  RootMutation: {
    loginUser(obj, args) {
      const errors = [];
      return UsersConnector.loginUser(args)
        .then(token => ({
          token,
          errors,
        }))
        .catch(err => {
          if (err.code && err.message) {
            errors.push({
              key: err.code,
              value: err.message,
            });

            return { token: null, errors };
          }

          throw new Error(err);
        });
    },
    registerUser(obj, args) {
      const errors = [];
      return UsersConnector.registerUser(args)
        .then(newUser => {
          return newUser;
        })
        .catch(err => {
          if (err.code && err.message) {
            errors.push({
              key: err.code,
              value: err.message,
            });

            return { user: null, errors };
          }

          throw new Error(err);
        });
    },
    createArticle(obj, args, context) {
      const errors = [];
      return ArticlesConnector.createArticle(args, context)
        .then(newArticle => {
          return newArticle;
        })
        .catch(err => {
          if (err.code && err.message) {
            errors.push({
              key: err.code,
              value: err.message,
            });

            return { article: null, errors };
          }

          throw new Error(err);
        });
    },
  },
  // Custom Scalars
  JSON: {
    __name: 'JSON',
    __description: `The JSON scalar type represents JSON values as specified by
                  [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).`,
    __serialize(value) {
      return value;
    },
    __parseValue(value) {
      return value;
    },
    __parseLiteral(ast) {
      if (ast.kind === Kind.OBJECT && typeof ast.value === 'object') {
        // ast value is always in string format
        return JSON.stringify(ast.value);
      }
      return null;
    },
  },
  URL: GraphQLURL,
  Email: GraphQLEmail,
  UUID: GraphQLUUID,
  Password: GraphQLPassword,
  Date: {
    __parseValue(value) {
      // value from the client
      return new Date(value);
    },

    __serialize(value) {
      // value sent to the client
      return value.getTime();
    },

    __parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return +ast.value;
      }

      return null;
    },
  },
};
