/* eslint-disable id-match */ /* eslint-disable no-unused-vars */
import bcrypt from 'bcryptjs';
import { Model } from 'objection';
import BaseModel from 'core/base/BaseModel';
// Related Models
import Role from '../role/role.model';
import Attachment from '../attachment/attachment.model';
import Token from '../token/token.model';
import Post from '../post/post.model';

class User extends BaseModel {
  static get tableName() {
    return 'user';
  }
  static addTimestamps = true;
  static addUUID = false;
  /**
   * An array of attribute names that will be excluded from being returned.
   *
   * @type {array}
   */
  static hidden = [];

  static get relationMappings() {
    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'user.role',
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
      tokens: {
        relation: Model.HasOneRelation,
        modelClass: Token,
        join: {
          from: 'user.id',
          to: 'token.user_id',
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
  hasRole(r) {
    if (!this.role) {
      return false;
    }
    console.log(this.role);
    const validRoles = this.role.filter(({ name }) => (name === r));

    return validRoles.length;
  }
}

export default User;
