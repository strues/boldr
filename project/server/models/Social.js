import BaseModel from './BaseModel';

/**
 * Social used for user's social media profiles. Belongs to User
 * @class Social
 * @extends BaseModel
 * @property {String}  id
 * @property {String} facebookUrl
 * @property {String} twitterUrl
 * @property {String} googleUrl
 * @property {String} githubUrl
 * @property {String} stackoverflowUrl
 * @property {String} linkedinUrl
 * @property {String}   userId
 */
class Social extends BaseModel {
  static tableName = 'profile_social_media';

  static addTimestamps = false;

  static jsonSchema = {
    type: 'object',
    required: ['id', 'profileId'],
    uniqueProperties: ['profileId'],
    additionalProperties: false,
    properties: {
      id: {
        type: 'string',
        minLength: 36,
        maxLength: 36,
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
      profileId: {
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

  static relationMappings = {
    profile: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/Profile`,
      join: {
        from: 'profile_social_media.profile_id',
        to: 'profile.id',
      },
    },
  };
}

export default Social;
