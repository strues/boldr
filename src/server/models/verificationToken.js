import { Model } from 'objection';
import BaseModel from './base';
import User from './user';

/**
 * VerificationToken used for account verification. Belongs to User
 * @class VerificationToken
 * @extends BaseModel
 * @property {Integer}  id
 * @property {String}   ip
 * @property {String}   token
 * @property {Boolean}  used
 * @property {String}   userId
 * @property {Date}     createdAt
 * @property {Date}     updatedAt
 */
class VerificationToken extends BaseModel {
  static get tableName() {
    return 'verification_token';
  }
  static addTimestamps = true;

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'verification_token.userId',
          to: 'user.id',
        },
      },
    };
  }
}

export default VerificationToken;
