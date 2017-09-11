/* eslint-disable id-match, no-prototype-builtins */
import Promise from 'bluebird';
import Bcrypt from 'bcryptjs';
// Related Models
import BaseModel, { mergeSchemas } from './BaseModel';

const bcrypt = Promise.promisifyAll(Bcrypt);

class Account extends BaseModel {
  static tableName = 'account';

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['email', 'password'],
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', // eslint-disable-line
      },
      email: {
        type: 'string',
      },
      password: { type: 'string' },
      ip: { type: 'string' },
      resetToken: { type: 'string' },
      resetTokenExp: {
        type: 'string',
        format: 'date-time',
      },
      verificationToken: { type: 'string' },
      verificationTokenExp: {
        type: 'string',
        format: 'date-time',
      },
      verified: { type: 'boolean' },
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
    this.email = this.email.trim();
  }

  static relationMappings = {
    roles: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: `${__dirname}/Role`,
      join: {
        from: 'account.id',
        through: {
          from: 'account_role.accountId',
          to: 'account_role.roleId',
          modelClass: `${__dirname}/join/AccountRole`,
        },
        to: 'role.id',
      },
    },
    articles: {
      relation: BaseModel.HasManyRelation,
      modelClass: `${__dirname}/Article`,
      join: {
        from: 'account.id',
        to: 'article.authorId',
      },
    },
    files: {
      relation: BaseModel.HasManyRelation,
      modelClass: `${__dirname}/File`,
      join: {
        from: 'account.id',
        to: 'file.ownerId',
      },
    },
    uploads: {
      relation: BaseModel.HasManyRelation,
      modelClass: `${__dirname}/Media`,
      join: {
        from: 'account.id',
        to: 'media.ownerId',
      },
    },
    profile: {
      relation: BaseModel.HasOneRelation,
      modelClass: `${__dirname}/Profile`,
      join: {
        from: 'account.id',
        to: 'profile.accountId',
      },
    },
  };

  static getAccountsProfile() {
    return Account.query().eager('[roles,profile]');
  }

  static getAccountById(id) {
    return Account.query()
      .findById(id)
      .eager('[roles,profile]');
  }

  static getAccountByEmail(email) {
    return Account.query()
      .where({ email })
      .eager('[roles,profile]')
      .then(x => x[0]);
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

export default Account;
