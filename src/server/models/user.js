/* eslint-disable id-match */ /* eslint-disable no-unused-vars */
import { Model } from 'objection';
import BaseModel from './base';
// Related Models
import Role from './role';
import Attachment from './attachment';
import ResetToken from './resetToken';
import VerificationToken from './verificationToken';
import Article from './article';
import UserRole from './join/userRole';
import Media from './media';
import Social from './social';

const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const debug = require('debug')('boldr:user-model');

/**
 * User model representing an account and identity of a person.
 * @class User
 * @extends BaseModel
 * @property {String}   firstName
 * @property {String}   lastName
 * @property {String}   username
 * @property {String}   email
 * @property {String}   bio
 * @property {String}   location
 * @property {String}   avatarUrl
 * @property {String}   profileImage
 * @property {String}   website
 * @property {String}   language
 * @property {Boolean}  verified
 * @property {Date}     birthday
 * @property {Date}     createdAt
 * @property {Date}     updatedAt
 * @property {Date}     deletedAt
 */
class User extends BaseModel {
  static get tableName() {
    return 'user';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstName', 'email', 'password', 'lastName', 'username'],
      properties: {
        id: {
          type: 'string',
          minLength: 36,
          maxLength: 36,
          pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', // eslint-disable-line
        },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: {
          type: 'string',
        },
        username: { type: 'string' },
        password: { type: 'string' },
        bio: { type: 'string' },
        location: { type: 'string' },
        website: { type: 'string' },
        avatarUrl: { type: 'string' },
        profileImage: { type: 'string' },
        language: { type: 'string' },
        verified: { type: 'boolean' },
        birthday: { type: 'date' },
        createdAt: { type: 'date-time' },
        updatedAt: { type: 'date-time' },
        deletedAt: { type: 'date-time' },
      },
    };
  }
  static addTimestamps = true;
  static get softDelete() {
    return true;
  }
  /**
   * An array of attribute names that will be excluded from being returned.
   *
   * @type {array}
   */
  static hidden = [];

  static get relationMappings() {
    return {
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: Role,
        join: {
          from: 'user.id',
          through: {
            from: 'user_role.userId',
            to: 'user_role.roleId',
          },
          to: 'role.id',
        },
      },
      articles: {
        relation: Model.HasManyRelation,
        modelClass: Article,
        join: {
          from: 'user.id',
          to: 'article.userId',
        },
      },
      files: {
        relation: Model.HasManyRelation,
        modelClass: Attachment,
        join: {
          from: 'user.id',
          to: 'attachment.userId',
        },
      },
      uploads: {
        relation: Model.HasManyRelation,
        modelClass: Media,
        join: {
          from: 'user.id',
          to: 'media.userId',
        },
      },
      verificationToken: {
        relation: Model.HasOneRelation,
        modelClass: VerificationToken,
        join: {
          from: 'user.id',
          to: 'verification_token.userId',
        },
      },
      resetToken: {
        relation: Model.HasOneRelation,
        modelClass: ResetToken,
        join: {
          from: 'user.id',
          to: 'reset_token.userId',
        },
      },
      socialMedia: {
        relation: Model.HasOneRelation,
        modelClass: Social,
        join: {
          from: 'user.id',
          to: 'social.userId',
        },
      },
    };
  }

  static getUserByUsername(username) {
    return User.query()
      .where({ username })
      .eager('[roles,socialMedia]')
      .then(x => x[0]);
  }

  static getUsers() {
    return User.query().eager('[roles,socialMedia]');
  }

  static getUserById(id) {
    return User.query().findById(id).eager('[roles,socialMedia]');
  }

  static getUserByEmail(email) {
    return User.query()
      .where({ email })
      .eager('[roles,socialMedia]')
      .then(x => x[0]);
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  stripPassword() {
    delete this['password']; // eslint-disable-line
    return this;
  }
  /**
   * Before inserting make sure we hash the password if provided.
   *
   * @param {object} queryContext
   */
  $beforeInsert(queryContext) {
    super.$beforeInsert(queryContext);

    if (this.hasOwnProperty('password')) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
    if (this.firstName) {
      this.firstName = this.firstName.trim();
    }
    if (this.lastName) {
      this.lastName = this.lastName.trim();
    }
    this.email = this.email.trim();
  }

  /**
   * authenticate is specific to the user instance. compares the hashed password
   * with the password from the request.
   * @param plainText
   * @returns {*}
   */
  authenticate(plainText) {
    return bcrypt.compareAsync(plainText, this.password);
  }
  /**
   * Before updating make sure we hash the password if provided.
   *
   * @param {object} queryContext
   */
  $beforeUpdate(queryContext) {
    super.$beforeUpdate(queryContext);

    if (this.hasOwnProperty('password')) {
      this.password = bcrypt.hashAsync(this.password, 10);
    }
  }

  /**
   * Checks to see if this user has the provided role or not.
   *
   * @param {string} role
   * @returns {boolean}
   */
  hasRole(role) {
    if (!this.roles) {
      return false;
    }

    const validRoles = this.roles.filter(({ name }) => name === role);

    return validRoles.length;
  }
}

export default User;
