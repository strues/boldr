import { Model } from 'objection';
import BaseModel from './base';
import User from './user';

/**
 * Social used for user's social media profiles. Belongs to User
 * @class Social
 * @extends BaseModel
 * @property {Integer}  id
 * @property {String} facebookUrl
 * @property {String} twitterUrl
 * @property {String} googleUrl
 * @property {String} githubUrl
 * @property {String} stackoverflowUrl
 * @property {String} linkedinUrl
 * @property {String}   userId
 */
class Social extends BaseModel {
  static get tableName() {
    return 'social';
  }
  static addTimestamps = false;

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'social.userId',
          to: 'user.id',
        },
      },
    };
  }
}

export default Social;
