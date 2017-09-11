/* eslint-disable id-match, no-prototype-builtins */
import Promise from 'bluebird';
import Bcrypt from 'bcryptjs';
// Related Models
import BaseModel, { mergeSchemas } from './BaseModel';

const bcrypt = Promise.promisifyAll(Bcrypt);

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
  static tableName = 'user';

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
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
    },
  });

  static addTimestamps = true;
  /**
   * An array of attribute names that will be excluded from being returned.
   *
   * @type {array}
   */
  static hidden = [];
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
  static relationMappings = {
    roles: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: `${__dirname}/Role`,
      join: {
        from: 'user.id',
        through: {
          from: 'user_role.userId',
          to: 'user_role.roleId',
          modelClass: `${__dirname}/join/UserRole`,
        },
        to: 'role.id',
      },
    },
    articles: {
      relation: BaseModel.HasManyRelation,
      modelClass: `${__dirname}/Article`,
      join: {
        from: 'user.id',
        to: 'article.authorId',
      },
    },
    files: {
      relation: BaseModel.HasManyRelation,
      modelClass: `${__dirname}/File`,
      join: {
        from: 'user.id',
        to: 'file.ownerId',
      },
    },
    uploads: {
      relation: BaseModel.HasManyRelation,
      modelClass: `${__dirname}/Media`,
      join: {
        from: 'user.id',
        to: 'media.ownerId',
      },
    },
    verificationToken: {
      relation: BaseModel.HasOneRelation,
      modelClass: `${__dirname}/VerificationToken`,
      join: {
        from: 'user.id',
        to: 'verification_token.userId',
      },
    },
    resetToken: {
      relation: BaseModel.HasOneRelation,
      modelClass: `${__dirname}/ResetToken`,
      join: {
        from: 'user.id',
        to: 'reset_token.userId',
      },
    },
    socialMedia: {
      relation: BaseModel.HasOneRelation,
      modelClass: `${__dirname}/Social`,
      join: {
        from: 'user.id',
        to: 'user_social_media.userId',
      },
    },
  };

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
    return User.query()
      .findById(id)
      .eager('[roles,socialMedia]');
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
   * authenticate is specific to the user instance. compares the hashed password
   * with the password from the request.
   * @param plainText
   * @returns {*}
   */
  async authenticate(plainText) {
    this.lastLogin = new Date().toISOString();
    const passwordMatch = await bcrypt.compare(plainText, this.password);
    return passwordMatch;
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
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
