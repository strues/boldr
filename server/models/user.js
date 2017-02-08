/* eslint-disable id-match */ /* eslint-disable no-unused-vars */
import bcrypt from 'bcryptjs';
import { Model } from 'objection';
import BaseModel from './base';
// Related Models
import Role from './role';
import Attachment from './attachment';
import ResetToken from './resetToken';
import VerificationToken from './verificationToken';
import Post from './post';
import UserRole from './join/userRole';

const debug = require('debug')('boldr:user-model');

class User extends BaseModel {
  static get tableName() {
    return 'user';
  }
  static addTimestamps = true;

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
            from: 'user_role.user_id',
            to: 'user_role.role_id',
          },
          to: 'role.id',
        },
      },
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: 'user.id',
          to: 'post.user_id',
        },
      },
      uploads: {
        relation: Model.HasManyRelation,
        modelClass: Attachment,
        join: {
          from: 'user.id',
          to: 'attachment.user_id',
        },
      },
      verificationToken: {
        relation: Model.HasOneRelation,
        modelClass: VerificationToken,
        join: {
          from: 'user.id',
          to: 'verification_token.user_id',
        },
      },
      resetToken: {
        relation: Model.HasOneRelation,
        modelClass: ResetToken,
        join: {
          from: 'user.id',
          to: 'reset_token.user_id',
        },
      },
    };
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
    if (this.firstName) this.firstName = this.firstName.trim();
    if (this.lastName) this.lastName = this.lastName.trim();
    this.email = this.email.trim();
  }

  /**
   * authenticate is specific to the user instance. compares the hashed password
   * with the password from the request.
   * @param plainText
   * @returns {*}
   */
  authenticate(plainText) {
    return bcrypt.compareSync(plainText, this.password);
  }
  /**
   * Before updating make sure we hash the password if provided.
   *
   * @param {object} queryContext
   */
  $beforeUpdate(queryContext) {
    super.$beforeUpdate(queryContext);

    if (this.hasOwnProperty('password')) {
      this.password = bcrypt.hashSync(this.password, 10);
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
