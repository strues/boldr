/* eslint-disable id-match, no-prototype-builtins */
import Promise from 'bluebird';
import Bcrypt from 'bcryptjs';
// Related Models
import BaseModel from './BaseModel';

const bcrypt = Promise.promisifyAll(Bcrypt);

class Account extends BaseModel {
  static tableName = 'account';

  static addTimestamps = true;
  /**
     * An array of attribute names that will be excluded from being returned.
     *
     * @type {array}
     */
  static hidden = [];

  static jsonSchema = {
    type: 'object',
    required: ['email', 'password'],
    uniqueProperties: ['email'],
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', // eslint-disable-line
      },
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        maxLength: 255,
      },
      ip: {
        type: 'string',
      },
      resetToken: {
        type: 'string',
      },
      resetTokenExp: {
        type: 'timestamp',
      },
      verificationToken: { type: 'string' },
      verificationTokenExp: {
        type: 'timestamp',
      },
      verified: {
        type: 'boolean',
        default: false,
      },
      lastLogin: {
        type: ['string', 'null'],
        format: 'date-time',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      updatedAt: {
        type: ['string', 'null'],
        format: 'date-time',
      },
      deletedAt: {
        type: ['string', 'null'],
        format: 'date-time',
      },
    },
  };

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
          from: 'account_role.account_id',
          to: 'account_role.role_id',
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
        to: 'article.author_id',
      },
    },
    files: {
      relation: BaseModel.HasManyRelation,
      modelClass: `${__dirname}/File`,
      join: {
        from: 'account.id',
        to: 'file.owner_id',
      },
    },
    uploads: {
      relation: BaseModel.HasManyRelation,
      modelClass: `${__dirname}/Media`,
      join: {
        from: 'account.id',
        to: 'media.owner_id',
      },
    },
    profile: {
      relation: BaseModel.HasOneRelation,
      modelClass: `${__dirname}/Profile`,
      join: {
        from: 'account.id',
        to: 'profile.account_id',
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
