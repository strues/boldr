import { Model } from 'boldr-orm';
import User from './User';

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
class Social extends Model {
  static tableName = 'social';
  static jsonSchema = {
    type: 'object',
    required: ['id', 'userId'],
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      userId: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      facebookUrl: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      googleUrl: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      githubUrl: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      twitterUrl: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      stackoverflowUrl: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
      linkedinUrl: {
        type: 'string',
        minLength: 1,
        maxLength: 255,
      },
    },
  };
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
